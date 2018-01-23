import { NgModule } from '@angular/core';

import { TablesRoutingModule } from "./tables-routing.module";
import { TablesDashboardModule } from './tables-dashboard/tables-dashboard.module';
import { TablesAdminModule } from './tables-admin/tables-admin.module';
import { TablesHistoryModule } from './tables-history/tables-history.module';

import { TablesComponent } from './tables.component';
import { TablesService } from './tables.service';


@NgModule({
  imports: [
    TablesRoutingModule,
    TablesDashboardModule,
    TablesAdminModule,
    TablesHistoryModule
  ],
  declarations: [
    TablesComponent
  ],
  providers: [
    TablesService
  ],
  exports: [
    TablesComponent
  ]
})
export class TablesModule { }
