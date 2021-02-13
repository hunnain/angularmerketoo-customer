import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import { Product } from '../../../shared/classes/product';
import { ExtendedCategories } from 'src/app/shared/utilities';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {

  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: Product[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public label: any[] = [];
  public startPrice: number = 0;
  public endPrice: number = 1200;
  public tags: any[] = [];
  public category: string;
  public extendedsubcategory: string;
  public name: string;
  public isInternationalShipping: boolean = null;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: ProductService) {
    // Get Query params..
    this.route.queryParams.subscribe(params => {



      this.brands = params.brand ? params.brand.split(",") : [];
      this.colors = params.color ? params.color.split(",") : [];
      this.size = params.size ? params.size.split(",") : [];
      this.label = params.label ? params.label.split(",") : [];
      this.startPrice = params.startPrice ? params.startPrice : this.startPrice;
      this.endPrice = params.endPrice ? params.endPrice : this.endPrice;
      this.tags = [...this.brands, ...this.colors, ...this.size, ...this.label]; // All Tags Array

      this.category = params.category ? params.category : null;
      this.extendedsubcategory = params.extendedsubcategory ? ExtendedCategories[params.extendedsubcategory] : null;
      this.name = params.name ? params.name : null;
      this.isInternationalShipping = params.isInternationalShipping !== null ? params.isInternationalShipping : null;
      this.sortBy = params.sortBy ? params.sortBy : 'ascending';
      this.pageNo = params.page ? params.page : this.pageNo;

      // console.log('💻', 'params', params, this.pageNo);
      let filters = {
        colors: this.colors,
        size: this.size,
        label: this.label,
        name: this.name,
        isInternationalShipping: this.isInternationalShipping,
        startPrice: this.startPrice,
        endprice: this.endPrice,
        sortBy: this.sortBy,
        category: this.category,
        extendedsubcategory: this.extendedsubcategory,
        pageNumber: this.pageNo
      };
      let query = '';
      for (let item in filters) {
        if (filters[item] instanceof Array && filters[item].length > 0 || typeof filters[item] !== 'object' && filters[item]) {
          query = `${query}&${[item]}=${filters[item]}`
        }
      }

      // Get Filtered Products..
      this.products = [];
      this.loader = true;
      this.productService.filterProducts(query).subscribe(response => {
        console.log('💻', 'response', response);
        if (response && response['body']) {
          let paginate = JSON.parse(response['headers'].get('X-Pagination'));
          this.products = response['body'];
          this.loader = false;
          console.log('💻', 'pagination', paginate);
          this.paginate = paginate;
        } else {
          this.loader = false
        }
        // // Sorting Filter
        // this.products = this.productService.sortProducts(response, this.sortBy);
        // // Category Filter
        // if (params.category)
        //   this.products = this.products.filter(item => item.type == this.category);
        // // Price Filter
        // this.products = this.products.filter(item => item.price >= this.startPrice && item.price <= this.endPrice)
        // // Paginate Products
        // this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
        // this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
      })
    })
  }

  ngOnInit(): void {
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
    this.label = this.label.filter(val => val !== tag);

    let params = {
      brand: this.brands.length ? this.brands.join(",") : null,
      color: this.colors.length ? this.colors.join(",") : null,
      size: this.size.length ? this.size.join(",") : null,
      label: this.label.length ? this.label.join(",") : null
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

  setShippingFilter(ev, bool) {
    let val = bool;
    this.isInternationalShipping = val;
    console.log('💻', val);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { isInternationalShipping: this.isInternationalShipping },
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

}
