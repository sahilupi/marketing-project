import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  errMsg: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.orders = this.activatedRoute.snapshot.data['orders'].orders;
    const resolvedData= this.activatedRoute.snapshot.data['orders'];
    this.errMsg = resolvedData.error;
    this.orders = resolvedData.orders;
  }
}
