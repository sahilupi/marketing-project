import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { ContactDataComponent } from './components/reusuable-components/contact-data/contact-data.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarComponent } from './components/ui-components/progress-bar/progress-bar.component';



@NgModule({
  declarations: [
    SafePipe,
    ContactDataComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SafePipe,
    ContactDataComponent,
    ProgressBarComponent
  ]
})
export class SharedModule { }
