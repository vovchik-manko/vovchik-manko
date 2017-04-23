import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TablesManagementComponent } from './tables-management.component';
import { NavTabsItemComponent } from './nav-tabs-item/nav-tabs-item.component';
import { OrderFormModule } from './order-form/order-form.module';

@NgModule({
  imports: [
    BrowserModule,
    OrderFormModule
  ],
  declarations: [
    TablesManagementComponent,
    NavTabsItemComponent
  ],
  exports: [
    TablesManagementComponent
  ]
})
export class TablesManagementModule { }
