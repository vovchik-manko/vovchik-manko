import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablesDashboardComponent } from './tables-dashboard/tables-dashboard.component';
import { PageNotFoundComponent } from "../shared/not-found.component";
import { TablesComponent } from "./tables.component";

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: 'dashboard',
        component: TablesDashboardComponent
      },
      {
        path: 'tables',
        loadChildren: 'app/tables/tables-admin/tables-admin.module#TablesAdminModule'
      },
      {
        path: 'visitors',
        loadChildren: 'app/tables/tables-history/tables-history.module#TablesHistoryModule'
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class TablesRoutingModule {}

/*
 Copyright 2017 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
