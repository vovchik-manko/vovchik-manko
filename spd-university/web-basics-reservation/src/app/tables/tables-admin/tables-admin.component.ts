import { Component, OnInit } from '@angular/core';

import { Table, TableGroup } from '../models/tables.model';
import { TablesService } from '../tables.service';

@Component({
  templateUrl: './tables-admin.component.html'
})
export class TablesAdminComponent implements OnInit {
  tableList: Table[];
  tableGroups: Array<TableGroup> = [];

  selectedMenu: number = null;

  constructor(private tableService: TablesService) { }

  ngOnInit(): void {
    this.tableList = this.tableService.getTables();
    this.tableGroups = this.tableService.getTableGroups();
  }

  public toggleMenu(i: number, isSelected: boolean) {
    this.selectedMenu = isSelected ? null : i;
  }
}
