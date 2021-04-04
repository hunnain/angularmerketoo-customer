import { Component, OnInit, ViewChild, ElementRef, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { Router, Params } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ToastrService } from 'ngx-toastr';
import { CommonErrorService } from '../../services/common-error.service';
import { SignalrService } from '../../services/signalr.service';

declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  public loginForm: FormGroup;
  public signupForm: FormGroup;

  public products: Product[] = []
  public wishlists: any[] = []
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
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public authService: AuthService,
    public cs: CommonService,
    private toastService: ToastrService,
    private commonErrorService: CommonErrorService,
    private router: Router,
    public productService: ProductService,
    public signalRService: SignalrService
  ) {
    this.authService.openLoginModal.subscribe(isopen => {
      if (isopen) {
        this.authService.openLoginModal.next(false);
        this.login(this.content);
      }
    })
    this.createLoginForm();
    this.createSignupForm();
    this.checkLoggedIn();
    this.productService.cartItems.subscribe(response => this.products = response);
    this.productService.wishlistItems.subscribe(response => this.wishlists = response);

    this.cs.isLoading.subscribe(res => {
      this.loginLoading = res;
      this.signupLoading = res;
    })

    this.authService.isLoggedOut.subscribe(res => {
      if (res) {
        this.authService.isLoggedOut.emit(false);
        this.menu = true;
      }
    })
  }

  ngOnInit(): void {
    this.lan = true;
  }

  ngOnDestroy() {
    // this.authService.isLoggedOut.unsubscribe();
    // this.cs.isLoading.unsubscribe();
  }

  checkLoggedIn() {
    let isLoggedIn = this.authService.checkUserLoggedIn(false);
    if (isLoggedIn) {
      this.menu = false;
    } else {
      this.menu = true;
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')]],
      password: ['', Validators.required],
    });
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')]],
      password: ['', Validators.required],
    });
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
    this.modalRef.result.then(res => console.log(res), (reason) => {
      console.log(reason)
      this.default = true;
      this.logi = true;
      this.register = true;
    })
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
  loginLoading = false
  tryLogin() {
    this.loginLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.cs.isLoading.next(false)
        this.loginLoading = false;
        // this.router.navigate(['/user']);
        this.modalRef.close();
        this.menu = false
        localStorage.setItem('userInfo', JSON.stringify(res));
        localStorage.setItem('accessToken', res['accessToken']);
        localStorage.setItem('refreshToken', res['refreshToken']);
      }
      , (err) => {
        console.log('error---', err)
        this.cs.isLoading.next(false)
        this.loginLoading = false;
        let msg = this.commonErrorService.parseServerError(err.error)
        this.toastService.error(msg, 'Error')
      }
    )
  }

  signupLoading = false;
  createCustomer() {

    let data = {
      ...this.signupForm.value,
    }
    this.signupLoading = true;
    this.default = false;
    this.register = true
    this.authService.signUp(data).subscribe(
      (res) => {
        this.signupLoading = false;
        if (res) {
          this.cs.isLoading.next(false)
          // this.router.navigate(['/login'])
          this.default = true;
          this.logi = false;
          this.register = true;
        }
      }
      // ,
      // (error) => {
      //   console.log(error, 'error');
      //   // this.loading = false;
      // }
    );
  }
}
