import { Component, OnInit } from '@angular/core';

import { TablesService } from '../tables.service';
import { Table } from '../models/tables.model';

@Component({
  templateUrl: './tables-history.component.html'
})
export class TablesHistoryComponent implements OnInit {
  tablesList: Table[];

  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.tablesList = this.tablesService.getTables();
  }
}
