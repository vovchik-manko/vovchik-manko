import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TablesManagementModule } from './tables-management/tables-management.module';
import { TablesHistoryModule } from './tables-history/tables-history.module';
import { TablesStatusModule } from './tables-status/tables-status.module';
import { TableService } from './table/table.service';

@NgModule({
  imports: [
    BrowserModule,
    TablesManagementModule,
    TablesHistoryModule,
    TablesStatusModule
  ],
  declarations: [
  ],
  providers: [
    TableService
  ],
  exports: [
  ]
})
export class TablesModule { }
