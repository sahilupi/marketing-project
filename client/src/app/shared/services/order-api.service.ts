import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

export interface OrdersSuccessResponse {
  success: boolean;
  orders: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http: HttpClient) { }

  postPlaceOrder(orderBody:any, domain: string) {
    const order = Object.assign({}, {orderBody, domain: domain});
    return this.http.post(environment.apiBaseUrl + '/orders/post-order', order);
  }

  postOrderResponse(orderSessionId:string) {
    return this.http.post(environment.apiBaseUrl + '/orders/post-order-response', {orderSessionId});
  }

  getUserOrders(): Observable<OrdersSuccessResponse> {
    return this.http.get<OrdersSuccessResponse>(environment.apiBaseUrl + '/orders/get-user-orders', {reportProgress: true});
  }

  getAllOrders(): Observable<OrdersSuccessResponse> {
    return this.http.get<OrdersSuccessResponse>(environment.apiBaseUrl + '/orders/get-orders', {reportProgress: true});
  }

  getUserOrder(orderId: string) {
    return this.http.get(environment.apiBaseUrl + '/orders/get-order/' + orderId);
  }
}
