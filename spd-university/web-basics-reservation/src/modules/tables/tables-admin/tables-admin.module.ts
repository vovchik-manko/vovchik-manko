import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesAdminComponent } from './tables-admin.component';
import { OrderFormModule } from './order-form/order-form.module';
import { TablesAdminRoutingModule } from './tables-admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrderFormModule,
    TablesAdminRoutingModule
  ],
  declarations: [
    TablesAdminComponent
  ]
})
export class TablesAdminModule {}
