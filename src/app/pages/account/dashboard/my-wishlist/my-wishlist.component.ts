import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../../../shared/services/product.service";
import { Product } from "../../../../shared/classes/product";
import { AddBase64InImg } from 'src/app/shared/utilities';

@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {

  public products: Product[] = [];
  public loading: boolean = false;

  constructor(
    private router: Router,
    public productService: ProductService
  ) {
    // this.productService.wishlistItems.subscribe(response => this.products = response);
    this.getWishlistFromDB();
  }

  ngOnInit(): void {
  }

  getWishlistFromDB() {
    this.loading = true;
    let query = ''
    this.productService.getAllWishlist(query).subscribe(res => {
      this.loading = false;
      if (res && res['body']) {
        // this.loading = false;
        this.productService.wishlistItems.subscribe(response => this.products = response);
      }
    })
  }

  async addToCart(product: any) {
    const status = await this.productService.addToCart(product);
    if (status) {
      this.router.navigate(['/shop/cart']);
      this.removeItem(product);
    }
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product).subscribe();
  }

  formatImage(img) {
    return img ? img : '';
  }

}
