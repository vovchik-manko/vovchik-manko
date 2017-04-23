import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { OrderFormComponent } from './order-form.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { OrderFormService } from "./order-form.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    OrderFormComponent,
    OrderStatusComponent,
    OrderDetailsComponent,
    ConfirmModalComponent
  ],
  providers: [
    OrderFormService
  ],
  exports: [
    OrderFormComponent
  ]
})
export class OrderFormModule { }
