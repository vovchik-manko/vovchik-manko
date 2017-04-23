import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Table } from '../../../table/table.model';

@Component({
  selector: 'vm-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input('table') t: Table;

  @Output() orderIsPaid = new EventEmitter<boolean>();
  @Output() paycheckIsHidden = new EventEmitter<boolean>();

  hidePaycheck() {
    this.paycheckIsHidden.emit();
  }

  payForOrder() {
    this.orderIsPaid.emit();
    this.t.initOrder();
  }
}
