import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TablesStatusComponent } from './tables-status.component';
import { TablesStatusItemComponent } from './tables-status-item.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    TablesStatusComponent,
    TablesStatusItemComponent
  ],
  exports: [
    TablesStatusComponent
  ]
})
export class TablesStatusModule { }
