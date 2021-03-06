import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private router: Router, private cs: CommonService) { }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any) {
    var item = {
      shippingDetails: details,
      product: product,
      orderId: orderId,
      totalAmount: amount
    };
    state.checkoutItems = item;
    localStorage.setItem("checkoutItems", JSON.stringify(item));
    localStorage.removeItem("cartItems");
    this.router.navigate(['/shop/checkout/success', orderId]);
  }


  stripeCheckout(order) {
    return this.cs.post('CheckoutApi/create-checkout-session', order)
  }

  FPSCheckout(order) {
    return this.cs.post('CheckoutApi/create-checkout-fps', order)
  }

  weChatCheckout(order) {
    return this.cs.post('CheckoutApi/create-checkout-wechat', order)
  }

  fetchOrderBySessionId(session_id) {
    return this.cs.get(`order/create-order/${session_id}`);
    // return this.cs.post(`order/create-order/${session_id}`, {});
    // return this.cs.get(`order/GetOrdersBySessionId/${session_id}`);
  }

  fetchOrderBySourceId(source_id) {
    return this.cs.get(`order/create-order/${source_id}`);
    // return this.cs.post(`order/create-order/${session_id}`, {});
    // return this.cs.get(`order/GetOrdersBySessionId/${session_id}`);
  }

  fetchOrderById(order_id) {
    return this.cs.get(`order/getorderbyid/${order_id}`);
  }

  fetchFPSOrderOnSuccess(id) {
    return this.cs.get(`order/get-orders-by-payment-key/${id}`);
  }

  fetchMyOrders(query = "") {
    return this.cs.get(`order/GetOrdersByCustomer?${query}`);
  }

}
