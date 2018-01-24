import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { OrderFormComponent } from "./order-form.component";

const routes: Routes = [
  {
    path: ':id',
    component: OrderFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class OrderFormRoutingModule {}
