import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TablesHistoryComponent } from './tables-history.component';
import { TablesHistoryTableHeaderComponent } from './tables-history-table-header.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    TablesHistoryComponent,
    TablesHistoryTableHeaderComponent
  ],
  exports: [
    TablesHistoryComponent
  ]
})
export class TablesHistoryModule { }
