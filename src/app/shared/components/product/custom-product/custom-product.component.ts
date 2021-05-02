import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";
import { AddBase64InImg } from 'src/app/shared/utilities';
import { AuthService } from 'src/app/core/auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-product',
  templateUrl: './custom-product.component.html',
  styleUrls: ['./custom-product.component.scss']
})
export class CustomProductComponent implements OnInit {

  editedImage;
  product;
  customImage;
  constructor(
    private router: Router,
    private productService: ProductService
  ) {
    this.product = JSON.parse(localStorage.getItem('customProduct'));
    if (this.product && this.product.customDesign && this.product.customDesign.imageUrl) {
      this.customImage = this.product.customDesign.imageUrl;
    }

  }

  ngOnInit(): void {
    console.log("custom product component")
  }

  getEditedImage(ev) {
    // console.log('get edited image', ev);
    this.editedImage = ev;
    this.addToCart();
  }

  // Add to cart
  async addToCart() {
    if (this.product && this.editedImage) {
      this.product.quantity = 1;
      this.product['customImage'] = this.removeBase64(this.editedImage);
      const status = await this.productService.addToCart(this.product);
      if (status) {
        this.router.navigate(['/shop/cart']);
        localStorage.removeItem('customProduct');
      }
    }
  }

  removeBase64(data) {
    let base = data;
    let splited = base.split('base64,');
    let byteImg = splited[1];
    return byteImg;
  }

}
