import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Table } from '../../../table/table.model';

@Component({
  moduleId: module.id,
  selector: 'vm-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent {
  @Input('table') t: Table;
}
