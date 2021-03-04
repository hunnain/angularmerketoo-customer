import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../../../shared/services/product.service";
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/classes/order';
import * as moment from 'moment';
import { ReturnModalComponent } from 'src/app/shared/components/modal/return/return.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderlistComponent implements OnInit {
  @ViewChild("returnModal") returnModal: ReturnModalComponent;

  public orders: Order[] = [];
  public selectedOrder: Order = {};

  public loading: boolean = false;
  constructor(
    private router: Router,
    public productService: ProductService,
    public orderService: OrderService,
    private viewScroller: ViewportScroller
  ) {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.orders = [];
    let query = `pageNumber=${this.pageNo}`
    this.orderService.fetchMyOrders(query).subscribe(res => {
      this.loading = false;
      if (res && res['body']) {
        this.orders = res['body'];
        let paginate = JSON.parse(res['headers'].get('X-Pagination'));
        this.paginate = paginate;
      }
    })
  }

  ngOnInit(): void {
  }

  returnOrder(order: any) {
    this.selectedOrder = order;
    this.returnModal.openModal();
  }

  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

  getProdNames(prods) {
    return prods.map(item => item.name).join(',');
  }

  getFormatDate(date) {
    return moment(date).format('MMM DD,YY');
  }

  onModalSave(data) {
    console.log("data", data)
  }


  // order Pagination
  public paginate: any = {}; // Pagination use only
  public pageNo: number = 1;
  setPage(page: number) {
    console.log(page);
    this.pageNo = page;
    this.getOrders();
    // this.viewScroller.setOffset([0, 0]);
    this.viewScroller.setOffset([120, 120]);
    this.viewScroller.scrollToAnchor('orderID'); // Anchore Link
  }

}
