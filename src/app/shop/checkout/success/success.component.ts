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

  public orderDetails: Order;

  public loading: boolean = true;
  queryParam: string = '';
  constructor(
    public productService: ProductService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['session_id'];
      if (this.queryParam) {
        localStorage.removeItem('cartItems')
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
    this.orderService.fetchOrderBySessionId(id).subscribe(res => {
      if (res && res.body) {
        this.orderDetails = res.body[0];
        this.loading = false;
      }
    })
  }


  getDate(date) {
    return moment(date).format('MMM DD,YY')
  }

}
