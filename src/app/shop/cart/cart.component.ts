import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { AddBase64InImg } from 'src/app/shared/utilities';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    public productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  formatImage(img) {
    return img ? img : '';
  }

  addBase64InImg(img) {
    return AddBase64InImg(img);
  }

  addToCart() {
    // console.log('💻 cart items--', this.products);
    if (this.authService.checkUserLoggedIn()) {
      this.router.navigate(['/shop/checkout'])
    }
    // let prods = JSON.parse(JSON.stringify(this.products));
    // let data = prods.map(item => {
    //   if (item.imageUrls) {
    //     delete item.imageUrls;
    //   } else if (item.image) {
    //     delete item.image;
    //   }

    //   return item;
    // })
    // this.productService.addCartToServer(data).subscribe(res => {
    //   if (res && res['body']) {
    //     this.router.navigate(['/shop/checkout'])
    //   }
    // });
  }

}
