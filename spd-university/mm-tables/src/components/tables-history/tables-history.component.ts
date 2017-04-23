import { Component, OnInit} from '@angular/core';

import { ITable } from '../table/table.model';
import { TableService } from '../table/table.service';

@Component({
  selector: 'vm-tables-history',
  templateUrl: './tables-history.component.html'
})
export class TablesHistoryComponent implements OnInit {
  tablesList: ITable[];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.tablesList = this.tableService.getTables();
  }
}
