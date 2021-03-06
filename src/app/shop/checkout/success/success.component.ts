import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit {

  public orders: Order[] = [];

  public loading: boolean = true;
  queryParam: string = '';
  key: string = "";
  public methods = {
    session_id: 'fetchOrderBySessionId',
    sourceId: 'fetchOrderBySourceId',
    orderId: 'fetchFPSOrderOnSuccess'
    // orderId: 'fetchOrderById'
  }
  constructor(
    public productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['session_id'] || params['orderId'] || params['sourceId']) {
        if (params['orderId']) {
          this.queryParam = params['orderId'];
          this.key = 'orderId';
        }

        if (params['sourceId']) {
          this.queryParam = params['sourceId'];
          this.key = 'sourceId';
        }

        if (params['session_id']) {
          this.queryParam = params['session_id'];
          this.key = 'session_id';
        }

        this.productService.emptyCart();
        this.getOrder(this.queryParam);
      }


    });
  }

  ngOnInit(): void {
    // this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
  }

  ngAfterViewInit() { }

  getOrder(id) {
    this.loading = true;
    // this.orderService.fetchOrderBySessionId(id)
    this.orderService[this.methods[this.key]](id)
      .subscribe(res => {
        if (res && res.body) {
          let data = res.body;
          this.orders = !Array.isArray(data) ? [data] : data;
          this.loading = false;
        }
      })
  }


  getDate(date) {
    return moment(date).format('MMM DD,YY')
  }

}
