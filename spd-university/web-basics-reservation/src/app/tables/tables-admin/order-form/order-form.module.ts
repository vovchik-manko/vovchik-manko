import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { OrderFormComponent } from './order-form.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { OrderFormService } from './order-form.service';
import { CheckComponent } from "../check/check.component";

import { SharedModule } from "../../../shared/shared.module";
import { OrderFormRoutingModule } from "./order-from.routing.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    OrderFormRoutingModule
  ],
  declarations: [
    OrderFormComponent,
    ConfirmModalComponent,
    CheckComponent
  ],
  providers: [
    OrderFormService
  ]
})
export class OrderFormModule { }
