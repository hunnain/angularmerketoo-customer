import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { SignalrService } from 'src/app/shared/services/signalr.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CouponService } from 'src/app/shared/services/coupon.service';
import * as moment from 'moment';

declare var Stripe;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('qrcodeModal') qrcodeModal: ElementRef
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrCodeValue = 'https://www.techiediaries.com/';

  public checkoutForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'card';
  public amount: any;
  public isOtherCountry: boolean = false;
  public IsInternationalShipping: boolean = false;
  public loading: boolean = false;

  public stripe = Stripe(environment.stripe_token)

  public useraddress = undefined;

  //FPS vars 
  public referenceNumber: string;
  constructor(private fb: FormBuilder,
    private router: Router,
    public productService: ProductService,
    private orderService: OrderService,
    private signalrService: SignalrService,
    private couponService: CouponService,
    private cs: CommonService,
    private modalService: NgbModal
  ) {
    this.fetchCoupons();

    this.signalrService.weChatResponse.subscribe(res => {
      if (res && this.payment === 'weChat') {
        this.onWeChatSunccess(res);
      }
    })

    this.cs.isLoading.subscribe(res => {
      this.loading = res;
    })

    let info = JSON.parse(localStorage.getItem('userInfo'));
    if (info) {
      const { address, country, city, regionState, zipCode } = info;
      if (address || country || city || regionState || zipCode) {
        this.useraddress = { address, country, city, state: regionState, postalcode: zipCode }
      }
    }
    this.checkoutForm = this.fb.group({
      // firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      // lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      // phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      // email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['Hong Kong', Validators.required],
      otherCountry: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required],
      note: ['', [Validators.maxLength(250)]]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    // this.initConfig();
    this.checkoutForm.controls.country.valueChanges.subscribe(val => {
      if (val === 'Other') {
        this.checkoutForm.controls.otherCountry.setValidators([Validators.required])
        this.isOtherCountry = true;
      } else {
        this.checkoutForm.controls.otherCountry.clearValidators();
        this.checkoutForm.controls.otherCountry.updateValueAndValidity()
        this.checkoutForm.controls.otherCountry.setValue("");
        this.isOtherCountry = false;
      }
    })
  }

  ngOnDestory() {
    this.signalrService.weChatResponse.emit(null);
    this.signalrService.weChatResponse.unsubscribe();
  }

  coupons: Array<any> = [];
  selectedCoupon;
  fetchCoupons() {
    this.couponService.getAllCoupons().subscribe(res => {
      if (res && res['body']) {
        this.coupons = res['body'];
      }
    })
  }

  isSame = false;
  changeisSameAddress(ev) {
    if (ev) {
      this.checkoutForm.setValue({ ...this.useraddress, otherCountry: '', note: '' });
    } else {
      this.checkoutForm.reset();
    }
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Stripe Payment Gateway
  // stripeCheckout() {
  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: environment.stripe_token, // publishble key
  //     locale: 'auto',
  //     token: (token: any) => {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.
  //       this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
  //     }
  //   });
  //   handler.open({
  //     name: 'marketoo',
  //     description: 'Online Fashion Store',
  //     amount: this.amount * 100
  //   })
  // }
  couponGenerator() {
    // var voucher_codes = require('voucher-code-generator');
    // console.log(voucher_codes.generate({
    //   length: 8,
    //   count: 5
    // }))

  }
  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
      currency: this.productService.Currency.currency,
      clientId: environment.paypal_token,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: this.productService.Currency.currency,
            value: this.amount,
            breakdown: {
              item_total: {
                currency_code: this.productService.Currency.currency,
                value: this.amount
              }
            }
          }
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        size: 'small', // small | medium | large | responsive
        shape: 'rect', // pill | rect
      },
      onApprove: (data, actions) => {
        this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  submitCheckout() {
    if (this.payment === 'card' || this.payment === 'alipay') {
      this.createOrderWithStripe();
    } else if (this.payment === 'FPS') {
      this.createOrderWithFPS();
    } else if (this.payment === 'weChat') {
      this.createOrderWithWeChatPay();
    } else {
      console.log('no payment method selected');
    }
  }

  get formatData() {
    let prods = this.products.map(({ productId, quantity, colour, size }) => ({ productId, quantity, colour, size }))
    let data = {
      ...this.checkoutForm.value,
      // paymentMethodType: this.payment,
      mode: "payment",
      cartItems: prods,
      IsInternationalShipping: this.IsInternationalShipping
    }

    if (this.payment === 'card' || this.payment === 'alipay') {
      data['paymentMethodType'] = this.payment;
    }

    if (this.payment === 'FPS') {
      data['referenceNumber'] = this.referenceNumber;
    }

    if (this.selectedCoupon && Object.keys(this.selectedCoupon).length) {
      const { couponKey, couponCode } = this.selectedCoupon;
      data['couponInfo'] = { couponKey, couponCode };
    }

    return data;
  }

  public discountedPrice: number = 0;
  public isCouponValid: boolean = false;
  onCouponChange(coupon) {
    console.log("selected---coupon", coupon)
    if (coupon && coupon !== 'none') {
      const { startDate, endDate, numberOfTimesUsed, percentageOrFixedAmt, usageLimit } = coupon;
      let currentDate = moment().format()
      let start_date = moment.utc(startDate).local().format()
      let end_date = moment.utc(endDate).local().format()
      if (moment(start_date).isSameOrBefore(currentDate) &&
        moment(end_date).isSameOrAfter(currentDate) &&
        numberOfTimesUsed <= usageLimit) {
        this.isCouponValid = true;
        this.createDiscount(percentageOrFixedAmt);
      } else {
        this.isCouponValid = false;
        console.log('coupon is invalid')
      }
    } else {
      this.discountedPrice = 0;
      console.log('none selected');
    }
  }

  createDiscount(percent) {
    console.log('create discount', this.amount, percent)
    if (percent && percent > 0) {
      this.discountedPrice = this.amount * percent / 100;
      console.log('💻', 'discounted price will be', this.discountedPrice);
    }
  }


  createOrderWithStripe() {
    this.loading = true;
    this.orderService.stripeCheckout(this.formatData).subscribe(res => {
      console.log(res)
      this.loading = false;
      if (res['id']) {
        this.stripe.redirectToCheckout({ sessionId: res['id'] })
          .then(res => console.log("successfull payment", res))
          .catch(err => console.log('Payment Error', err))
      }
    })
  }

  createOrderWithFPS() {
    this.loading = true;
    this.orderService.FPSCheckout(this.formatData).subscribe(res => {
      console.log(res)
      this.loading = false;
      if (res) {
        this.router.navigate(['shop/checkout/success'], { queryParams: { orderId: this.referenceNumber } })
      }
    })
  }
  createOrderWithWeChatPay() {
    this.loading = true;
    this.orderService.weChatCheckout(this.formatData).subscribe(res => {
      console.log(res)
      this.loading = false;
      if (res && res['wechat'] && res['wechat']['qr_code_url']) {
        // open  qrcode modal
        this.qrCodeValue = res['wechat']['qr_code_url'];
        this.open();
      }
    })
  }

  onWeChatSunccess(res) {
    console.log("res--- in wechat", res);
    let result = res;
    this.signalrService.weChatResponse.emit(null);
    if (result.status !== 'failed') {
      this.modalService.dismissAll();
      this.router.navigate(['shop/checkout/success'], { queryParams: { sourceId: result.sourceId } })
    } else {
      console.log('status failed', result)
    }
  }

  // modal event
  open() {
    this.modalService
      .open(this.qrcodeModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed`);
        }
      );
  }

}
