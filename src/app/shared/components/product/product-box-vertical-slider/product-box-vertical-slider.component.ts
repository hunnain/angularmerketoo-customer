import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { Product } from '../../../classes/product';
import { ProductService } from '../../../services/product.service';
import { AddBase64InImg } from 'src/app/shared/utilities';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {

  @Input() title: string = 'New Product'; // Default
  @Input() type: string = 'fashion'; // Default Fashion

  public products: Product[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      if (response['body']) {
        this.products = response['body'].filter(item => item.type == this.type)
      }
    }
    );
  }

  ngOnInit(): void {
  }

  formatImage(img) {
    return img ? img : ''
  }

}
