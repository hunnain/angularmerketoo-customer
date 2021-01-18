import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";

declare var Stripe;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm: FormGroup;
  public products: Product[] = [];
  public payPalConfig?: IPayPalConfig;
  public payment: string = 'Stripe';
  public amount: any;
  public isOtherCountry: boolean = false;

  public stripe = Stripe(environment.stripe_token)
  constructor(private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService) {
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


  createOrderWithStripe() {
    let prods = this.products.map(({ productId, quantity, colour, size }) => ({ productId, quantity, colour, size }))
    let data = {
      ...this.checkoutForm.value,
      paymentMethodType: "card",
      mode: "payment",
      productDetails: prods,
    }
    console.log("createding order data", data)
    // console.log("stripe", this.stripe)
    this.orderService.stripeCheckout(data).subscribe(res => {
      console.log(res)
      if (res['id']) {
        this.stripe.redirectToCheckout({ sessionId: res['id'] })
          .then(res => console.log("successfull payment", res))
          .catch(err => console.log('Payment Error', err))
      }
    })
  }

}
