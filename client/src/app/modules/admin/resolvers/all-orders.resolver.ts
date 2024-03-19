import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

import { OrderApiService, OrdersSuccessResponse } from 'src/app/shared/services/order-api.service';

@Injectable({
  providedIn: 'root'
})
export class AllOrdersResolver implements Resolve<OrdersSuccessResponse> {
    constructor(private orderService: OrderApiService) { }
    resolve(): Observable<OrdersSuccessResponse> {
      return this.orderService.getAllOrders().pipe(
        map((res: OrdersSuccessResponse) => ({ orders: res['orders'], success: true })),
        catchError((error) => {
          let message = 'An Error occured'
          if(error.error.message) {
            message = error.error.message
          }
          return of({ orders: [], error: message, success: false });
        })
      );
  }
}
