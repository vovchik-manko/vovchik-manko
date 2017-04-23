import { Component, OnInit} from '@angular/core';

import { ITable } from '../table/table.model';
import { TableService } from '../table/table.service';

@Component({
  selector: 'vm-tables-status',
  templateUrl: './tables-status.component.html'
})
export class TablesStatusComponent implements OnInit {
  tableList: ITable[];
  tableGroups: Array<ITable[]> = [];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.tableList = this.tableService.getTables();
    this.tableGroups = this.tableService.getTableGroups();
  }
}
