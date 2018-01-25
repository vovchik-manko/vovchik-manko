import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TablesDashboardComponent } from "./tables-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: TablesDashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TablesDashboardRoutingModule {}
