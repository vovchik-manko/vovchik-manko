import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TablesHistoryComponent } from "./tables-history.component";

const routes: Routes = [
  {
    path: '',
    component: TablesHistoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class TablesHistoryRoutingModule {}
