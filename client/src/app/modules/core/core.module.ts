import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TermsComponent } from './components/terms/terms.component';
import { RefundComponent } from './components/refund/refund.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TermsComponent,
    RefundComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    CarouselModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
