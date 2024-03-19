import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminIndexComponent } from './admin-index/admin-index.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/app/shared/auth/admin-auth.guard';
import { AllOrdersResolver } from './resolvers/all-orders.resolver';

const routes: Routes = [
  {
    path: '', component: AdminIndexComponent, title: 'Admin Dashboard - Markutting', canActivate: [AdminAuthGuard]
  },
  {
    path: 'orders', component: OrdersComponent, title: 'View All orders - Markutting', canActivate: [AdminAuthGuard], resolve: {allorders: AllOrdersResolver}
  },
  {
    path: 'users', component: UsersComponent, title: 'View All Users - Markutting', canActivate: [AdminAuthGuard]
  }
]

@NgModule({
  declarations: [
    AdminIndexComponent,
    UsersComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
