import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { AddBase64InImg } from 'src/app/shared/utilities';
import { AuthService } from 'src/app/core/auth.service';
import { FeedbackService } from 'src/app/shared/services/feedback.service';
import * as moment from 'moment';
import { ReportProductComponent } from 'src/app/shared/components/modal/report-product/report-product.component';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {
  @ViewChild("reportModal") reportModal: ReportProductComponent;
  // @ViewChild('owlCar') owlCar;

  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public selectedColor: any;
  public mobileSidebar: boolean = false;

  public reviewTitle: string = "";
  public review: string = "";
  public rating: number = 0;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private feedbackService: FeedbackService
  ) {
    this.route.data.subscribe(response => {
      this.product = response.data;
      if (this.product && Object.keys(this.product).length) {
        this.selectColor(this.product.availableColors[0])
        this.selectSize(this.product.availableSizes[0])
        if (this.product.customSize) {
          this.product.availableSizes.push(this.product.customSize);
        }
      }
    });
  }

  ngOnInit(): void {
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  selectColor(color) {
    this.selectedColor = color;
    // this.owlCar.to((this.activeSlide = ind.toString()))
  }

  // Increament
  increment() {
    if (this.counter < this.product.quantity) {
      this.counter++;
    }
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: any) {
    if (this.authService.checkUserLoggedIn()) {
      product.quantity = this.counter || 1;
      product.size = this.selectedSize;
      product.color = this.selectedColor;
      const status = await this.productService.addToCart(product);
      if (status)
        this.router.navigate(['/shop/cart']);
    }
  }

  // Buy Now
  async buyNow(product: any) {
    if (this.authService.checkUserLoggedIn()) {
      product.quantity = this.counter || 1;
      product.size = this.selectedSize;
      product.color = this.selectedColor;
      const status = await this.productService.addToCart(product);
      if (status)
        this.router.navigate(['/shop/checkout']);
    }
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    if (this.authService.checkUserLoggedIn()) {
      this.productService.addToWishlist(product).subscribe();
    }
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  formatImage(img) {
    return img ? img : ""
  }


  onRateChange(rate) {
    this.rating = rate;
  }

  formatDate(date) {
    return moment(date).format('DD MMMM YYYY HH:mm A')
  }

  submitReview() {
    let data = {
      reviewTitle: this.reviewTitle,
      review: this.review,
      rating: this.rating,
      productId: this.product.productId
    }

    this.feedbackService.addFeedback(data).subscribe(res => {
      if (res) {
        this.review = "";
        this.reviewTitle = "";
        this.rating = 0;
        // this.refreshPage()
      }
    })
  }

  refreshPage() {
    window.location.reload()
    // this.router.navigate(['/shop/product/left/sidebar/', this.product.productId], {
    //   relativeTo: this.route,
    //   // queryParams: {},
    //   queryParamsHandling: 'merge', // preserve the existing query params in the route
    //   skipLocationChange: false  // do trigger navigation
    // })
    //   .finally(() => {
    //   });
    // this.router.navigated = false;
    // setTimeout(() => {
    //   this.router.navigate(['/shop/product/left/sidebar/', this.product.productId]);
    // }, 2000);
  }

  reportProduct(prod) {
    console.log('💻', prod);
    this.reportModal.openModal(prod);
  }

  onModalSave(res) {
    console.log("report saved", res)
  }

}
