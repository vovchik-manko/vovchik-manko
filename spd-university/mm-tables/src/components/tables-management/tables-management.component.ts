import { Component, OnInit } from '@angular/core';

import { ITable } from '../table/table.model';
import { TableService } from '../table/table.service';

@Component({
  selector: 'vm-tables-management',
  templateUrl: './tables-management.component.html',
  styleUrls: ['./tables-management.component.css']
})
export class TablesManagementComponent implements OnInit {
  tableList: ITable[];
  tableGroups: Array<ITable[]> = [];

  selectedTab: number = null;
  selectedMenu: number = null;

  constructor(private tableService: TableService) { }

  showTabPane(id: number) {
    this.selectedTab = id;
  }

  toggleMenu(event: any, i: number) {
    event.preventDefault();

    if (this.selectedMenu === i) {
      this.hideMenu();
    } else {
      this.selectedMenu = i;
    }
  }

  hideMenu() {
    this.selectedMenu = null;
  }

  ngOnInit(): void {
    this.tableList = this.tableService.getTables();
    this.tableGroups = this.tableService.getTableGroups();
  }
}
