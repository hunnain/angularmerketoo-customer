import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";
import { AddBase64InImg } from 'src/app/shared/utilities';
import { AuthService } from 'src/app/core/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-product-box-one',
  templateUrl: './product-box-one.component.html',
  styleUrls: ['./product-box-one.component.scss']
})
export class ProductBoxOneComponent implements OnInit {

  @Input() product: Product;
  @Input() currency: any = this.productService.Currency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ImageSrc: string

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.imageUrls.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src;
          }
        })
      }
    })
  }

  // Change Variants Image
  ChangeVariantsImage(src) {
    this.ImageSrc = src;
  }

  openCartModal(product) {
    // if (this.authService.checkUserLoggedIn()) {
    this.CartModal.openModal(product)
    // }
  }

  addToCart(product: any) {
    // if (this.authService.checkUserLoggedIn()) {
    this.productService.addToCart(product);
    // }
  }

  addToWishlist(product: any) {
    if (this.authService.checkUserLoggedIn()) {
      this.productService.addToWishlist(product).subscribe();
    }
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }

  formatImage(img) {
    return img ? img : '';
  }

  showIfAddedInAMonth(date) {
    let currentDate = moment();
    return moment(currentDate).diff(date, 'days') > 30 ? false : true;
  }

}
