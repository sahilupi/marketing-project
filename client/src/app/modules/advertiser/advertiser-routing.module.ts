import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllvideocheckoutComponent } from './components/allvideocheckout/allvideocheckout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAuthGuard } from 'src/app/shared/auth/user-auth.guard';
import { OrdersResolver } from './resolvers/orders.resolver';

const routes: Routes = [
    {
        path: 'allvideocheckout', component: AllvideocheckoutComponent, pathMatch: 'full', title: 'Order Now - Markutting'
    },
    {
        path: 'profile', component: DashboardComponent, title: 'User Profile - Markutting', canActivate: [UserAuthGuard], resolve: {orders: OrdersResolver}
    }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
],
  exports: [RouterModule]
})
export class AdvertiserRoutingModule { }
