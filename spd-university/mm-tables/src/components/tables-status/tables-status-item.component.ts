import { Component, OnInit, Input} from '@angular/core';

import { ITable } from '../table/table.model';

@Component({
  moduleId: module.id,
  selector: 'vm-tables-status-item',
  templateUrl: './tables-status-item.component.html'
})
export class TablesStatusItemComponent implements OnInit {
  @Input() table: ITable;
  tableStatusClasses: {};
  isAvailable: boolean;

  setTableStatusClasses() {
    this.isAvailable = this.table.status === 'available';
    this.tableStatusClasses = {
      'text-center': true,
      'list-group-item': true,
      'list-group-item-success': this.isAvailable,
      'active': !this.isAvailable
    };
  }

  ngOnInit() {
    this.setTableStatusClasses();
  }
}
