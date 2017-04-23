import { Component, Input, OnInit} from '@angular/core';

import { ITable } from '../table/table.model';

@Component({
  moduleId: module.id,
  selector: 'vm-tables-history-table-header',
  templateUrl: './tables-history-table-header.component.html'
})
export class TablesHistoryTableHeaderComponent implements OnInit {
  @Input() table: ITable;

  isAvailable: boolean;
  tableStatusClasses: {};

  setTableStatusClasses() {
    this.tableStatusClasses =  {
      'list-group-item': true,
      'list-group-item-success': this.isAvailable,
      active: !this.isAvailable
    };
  }

  ngOnInit() {
    this.isAvailable = this.table.status === 'available';
    this.setTableStatusClasses();
  }
}
