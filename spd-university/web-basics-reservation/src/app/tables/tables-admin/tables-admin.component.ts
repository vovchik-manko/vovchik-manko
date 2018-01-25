import { Component, OnInit } from '@angular/core';

import { TableGroup } from '../models/tables.model';
import { TablesService } from '../tables.service';

@Component({
  templateUrl: './tables-admin.component.html'
})
export class TablesAdminComponent implements OnInit {
  tableGroups: Array<TableGroup> = [];
  selectedMenu: number = null;

  constructor(private tableService: TablesService) { }

  ngOnInit(): void {
    this.tableService.getTableGroups()
      .subscribe(groups => this.tableGroups = groups || []);
  }

  toggleMenu(i: number, isSelected: boolean) {
    this.selectedMenu = isSelected ? null : i;
  }
}
