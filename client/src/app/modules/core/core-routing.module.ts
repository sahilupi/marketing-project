import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { TermsComponent } from './components/terms/terms.component';
import { RefundComponent } from './components/refund/refund.component';
import { PrivacyComponent } from './components/privacy/privacy.component';


const routes: Routes = [
    {
        path: '', component: HomeComponent, pathMatch: 'full', title: 'Buy Views, Likes, Subscribers'
    },
    {
        path: 'about', component: AboutComponent, title: 'About us - Markutting'
    },
    {
        path: 'contact', component: ContactComponent, title: 'Contact us - Markutting'
    },
    {
        path: 'user/terms', component: TermsComponent, title: 'User Terms and Conditions - Markutting'
    },
    {
        path: 'user/refund', component: RefundComponent, title: 'User Refund Policy - Markutting'
    },
    {
        path: 'user/privacy', component: PrivacyComponent, title: 'User Privacy Policy - Markutting'
    }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
