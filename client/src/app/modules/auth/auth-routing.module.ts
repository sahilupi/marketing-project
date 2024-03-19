import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'user/login', pathMatch: 'full'
  },
  {
    path: 'user', children: [
      {
        path: 'login', component: LoginComponent, data: { title: 'User Login' }
      },
      {
        path: 'register', component: RegisterComponent, data: { title: 'User Signup' }
      }
    ]
  },
  {
    path: 'admin', children: [
      {
        path: 'login', component: LoginComponent, data: { title: 'Admin Login' }
      }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
