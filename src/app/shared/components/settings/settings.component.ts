import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { Router, Params } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service'

declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = []
  public text = { openshop: "Open Shop" }
  public lan: boolean;
  public register: boolean = true;
  public menu: boolean = true;
  private modalRef: NgbModalRef;
  public logi: boolean = true;
  public default: boolean = true;
  public loginDialog: string = "AddNewBattery";
  themeLogo: string = 'assets/Marketoo.png';
  loginLogo: string = 'assets/images/login.jpg';
  public languages = [{
    name: 'Chinese',
    code: 'zh-Hant'
  }, {
    name: 'English',
    code: 'en'
  }];

  public currencies = [{
    name: 'Euro',
    currency: 'EUR',
    price: 0.90 // price of euro
  }, {
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  }, {
    name: 'Pound',
    currency: 'GBP',
    price: 0.78 // price of euro
  }, {
    name: 'Dollar',
    currency: 'USD',
    price: 1 // price of usd
  }]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private modalService: NgbModal,
    public authService: AuthService,
    private router: Router,
    public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
    this.lan = true;
  }
  changelan() {
    if (this.lan == false) {
      this.lan = true;
    } else {
      this.lan = false
    }
  }

  login(content) {
    this.default = false
    this.modalRef = this.modalService.open(content, { centered: true });
  }
  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }
  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        console.log(res)
        this.menu = false
        this.modalRef.close();
        this.router.navigate(['/user']);
      })
  }
  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.menu = false
        this.modalRef.close();
        this.menu = false
        this.router.navigate(['/user']);
      })
  }
  tryLogin() {
    // this.authService.doLogin(value)
    //   .then(res => {
    //     this.router.navigate(['/user']);
    //   }, err => {
    //     console.log(err);
    //   })
    this.modalRef.close();
    this.menu = false
    // this.router.navigate(['/user']);
  }
}
