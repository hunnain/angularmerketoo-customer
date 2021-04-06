import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';
import { SellerService } from 'src/app/shared/services/seller.service';
import { Seller } from 'src/app/shared/classes/seller';
import { AddBase64InImg } from 'src/app/shared/utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-designer-page',
  templateUrl: './designer-page.component.html',
  styleUrls: ['./designer-page.component.scss']
})
export class DesignerPageComponent implements OnInit {

  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  public sellerId: string = '';
  public loading: boolean = false;
  public sellerInfo: Seller;

  public message: string = "";
  public activeTab: number = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewScroller: ViewportScroller,
    public productService: ProductService,
    public sellerService: SellerService,
    private modalService: NgbModal,
    private authService: AuthService,
    private generalService: GeneralService
  ) {
    // Get Query params..
    // this.route.queryParams.subscribe(params => {

    //   this.brands = params.brand ? params.brand.split(",") : [];
    //   this.colors = params.color ? params.color.split(",") : [];
    //   this.size = params.size ? params.size.split(",") : [];
    //   this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
    //   this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
    //   this.tags = [...this.brands, ...this.colors, ...this.size]; // All Tags Array

    //   this.category = params.category ? params.category : null;
    //   this.sortBy = params.sortBy ? params.sortBy : 'ascending';
    //   this.pageNo = params.page ? params.page : this.pageNo;

    //   // Get Filtered Products..
    //   this.productService.filterProducts(this.tags).subscribe(response => {
    //     // Sorting Filter
    //     this.products = this.productService.sortProducts(response, this.sortBy);
    //     // Category Filter
    //     if (params.category)
    //       this.products = this.products.filter(item => item.type == this.category);
    //     // Price Filter
    //     this.products = this.products.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice)
    //     // Paginate Products
    //     this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
    //     this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
    //   })
    // })

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.sellerId = params.id;
        this.loading = true;
        this.fetchSellerInfo(this.sellerId);
      }
    });
  }

  ngOnInit(): void {
    this.getCampaigns()
  }

  fetchSellerInfo(id) {
    this.sellerService.getSellerById(id).subscribe(res => {
      if (res && res['body']) {
        this.sellerInfo = res['body'];
        this.loading = false;
      }
    })
  }

  public campaign = null;
  getCampaigns() {
    this.generalService.getRandomCampaign().subscribe(res => {
      if (res && res['body']) {
        this.campaign = res['body']
      }
    })
  }

  followSeller() {
    this.sellerService.followSeller(this.sellerId).subscribe(res => {
      if (res) {
        this.loading = false;
        this.fetchSellerInfo(this.sellerId);
      }
    })
  }

  unfollowSeller() {
    this.sellerService.unfollowSeller(this.sellerId).subscribe(res => {
      if (res) {
        this.loading = false;
        this.fetchSellerInfo(this.sellerId);
      }
    })
  }


  // Append filter value to Url
  updateFilter(tags: any) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {

    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if (value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  formatImage(img) {
    return img ? img : '';
  }

  // modal event
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
          this.message = "";
        },
        (reason) => {
          this.message = "";
          console.log(`Dismissed`);
        }
      );
  }

  openContactModal(content) {
    this.open(content);
  }

  sendMessage() {
    let data = {
      text: this.message,
      receiverId: this.sellerId
    }
    this.loading = true
    this.sellerService.sendMessageToSeller(data).subscribe(res => {
      if (res) {
        this.loading = false;
        this.modalService.dismissAll()
      }
    })
  }


  get checkIfUserLoggedIn() {
    let isLoggedIn = false;
    if (this.authService.checkUserLoggedIn(false)) {
      isLoggedIn = true;
    }
    return isLoggedIn;
  }

}
