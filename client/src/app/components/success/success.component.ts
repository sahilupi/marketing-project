import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderApiService } from 'src/app/shared/services/order-api.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  isSuccessFromServer = false;
  isLoading = false;

  constructor(private orderService: OrderApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['session_id']) {
        this.orderService.postOrderResponse(params['session_id']).subscribe((res: any) => {
          if(res.success) {
            this.isSuccessFromServer = true;
          }
          this.isLoading = false;
        }, err => {
          console.log(err)
          this.isSuccessFromServer = false;
          this.isLoading = false;
        })
      }
    })
  }
}
