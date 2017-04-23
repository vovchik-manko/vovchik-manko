import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesManagementComponent } from '../components/tables-management/tables-management.component';
import { TablesStatusComponent } from '../components/tables-status/tables-status.component';
import { TablesHistoryComponent } from '../components/tables-history/tables-history.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/status',
    pathMatch: 'full'
  },
  {
    path: 'status',
    component: TablesStatusComponent
  },
  {
    path: 'tables',
    component: TablesManagementComponent
  },
  {
    path: 'visitors',
    component: TablesHistoryComponent
  }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
