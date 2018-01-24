import { NgModule } from '@angular/core';

import { TablesDashboardRoutingModule } from "./tables-dashboard.routing.module";
import { SharedModule } from "../../shared/shared.module";

import { TablesDashboardComponent } from './tables-dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    TablesDashboardRoutingModule
  ],
  declarations: [
    TablesDashboardComponent
  ]
})
export class TablesDashboardModule {}
