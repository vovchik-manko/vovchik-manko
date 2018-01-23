import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { OrderFormComponent } from './order-form.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { OrderFormService } from './order-form.service';
import { CheckComponent } from "../check/check.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    OrderFormComponent,
    ConfirmModalComponent,
    CheckComponent
  ],
  providers: [
    OrderFormService
  ],
  exports: [
    OrderFormComponent
  ]
})
export class OrderFormModule { }
