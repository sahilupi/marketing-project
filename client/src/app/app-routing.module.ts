import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserAuthGuard } from './shared/auth/user-auth.guard';
import { SuccessComponent } from './components/success/success.component';
import { AdminAuthGuard } from './shared/auth/admin-auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'advertiser', canActivate:[UserAuthGuard], loadChildren: () => import('./modules/advertiser/advertiser.module').then(m => m.AdvertiserModule)
  },
  {
    path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminAuthGuard]
  },
  {
    path: 'success', component: SuccessComponent, title: 'Order Placed', canActivate: [UserAuthGuard]
  },
  {
    path: '**', component: NotFoundComponent, data: { title: 'Page not found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
