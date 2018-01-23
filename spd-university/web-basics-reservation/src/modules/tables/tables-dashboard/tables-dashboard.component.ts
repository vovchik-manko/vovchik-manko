import { Component, OnInit } from '@angular/core';

import { Table, TableGroup } from '../models/tables.model';
import { TablesService } from '../tables.service';

@Component({
  templateUrl: './tables-dashboard.component.html'
})
export class TablesDashboardComponent implements OnInit {
  tableList: Table[];
  tableGroups: Array<TableGroup> = [];

  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.tableList = this.tablesService.getTables();
    this.tableGroups = this.tablesService.getTableGroups();
  }
}
