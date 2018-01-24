import { NgModule } from '@angular/core';

import { TablesHistoryRoutingModule } from "./tables-history.routing.module";
import { SharedModule } from "../../shared/shared.module";

import { TablesHistoryComponent } from './tables-history.component';


@NgModule({
  imports: [
    SharedModule,
    TablesHistoryRoutingModule
  ],
  declarations: [
    TablesHistoryComponent
  ]
})
export class TablesHistoryModule {}
