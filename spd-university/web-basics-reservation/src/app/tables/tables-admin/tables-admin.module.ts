import { NgModule } from '@angular/core';

import { OrderFormModule } from './order-form/order-form.module';
import { TablesAdminRoutingModule } from './tables-admin.routing.module';
import { SharedModule } from "../../shared/shared.module";

import { TablesAdminComponent } from './tables-admin.component';

@NgModule({
  imports: [
    SharedModule,
    OrderFormModule,
    TablesAdminRoutingModule
  ],
  declarations: [
    TablesAdminComponent
  ]
})
export class TablesAdminModule {}
