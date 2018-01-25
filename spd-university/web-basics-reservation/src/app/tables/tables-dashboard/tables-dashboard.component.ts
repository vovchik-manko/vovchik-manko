import { Component, OnInit } from '@angular/core';

import { TableGroup } from '../models/tables.model';
import { TablesService } from '../tables.service';

@Component({
  templateUrl: './tables-dashboard.component.html'
})
export class TablesDashboardComponent implements OnInit {
  tableGroups: Array<TableGroup> = [];

  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.tablesService.getTableGroups()
      .subscribe(groups => this.tableGroups = groups || []);
  }
}
