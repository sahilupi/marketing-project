import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';

import { AllvideocheckoutComponent } from './components/allvideocheckout/allvideocheckout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdvertiserRoutingModule } from './advertiser-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AllvideocheckoutComponent,
    DashboardComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    AdvertiserRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    SharedModule
  ]
})
export class AdvertiserModule { }
