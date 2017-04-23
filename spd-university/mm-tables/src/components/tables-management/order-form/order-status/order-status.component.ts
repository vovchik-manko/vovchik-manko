import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Table } from '../../../table/table.model';

@Component({
  moduleId: module.id,
  selector: 'vm-order-status',
  templateUrl: './order-status.component.html',
})
export class OrderStatusComponent implements OnInit {
  @Input('table') t: Table;

  isAvailable: boolean;
  orderStatusClasses: {};

  setOrderStatusClasses() {
    this.isAvailable = this.t.status === 'available';
    this.orderStatusClasses = {
      panel: true,
      'panel-success': this.isAvailable,
      'panel-info': !this.isAvailable
    };
  }

  ngOnInit() {
    this.setOrderStatusClasses();
  }

  ngDoCheck() {
    this.setOrderStatusClasses();
  }
}
