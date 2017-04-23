import { Component, Input} from '@angular/core';

import { Table, IItemOrdered } from '../../table/table.model';
import { OrderFormService } from "./order-form.service";

@Component({
  moduleId: module.id,
  selector: 'vm-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent {
  hidden: boolean;
  quantity: number[] = Array.from(new Array(20), (x, i) => i + 1);

  @Input('table') t: Table;

  constructor(private orderFormService: OrderFormService) {
    this.hidden = true;
  }

  viewPaycheck() {
    this.hidden = false;
  }

  removePaycheck() {
    this.hidden = true;
  }

  processOrder(item: IItemOrdered, table: Table, form: any) {
    if (this.orderFormService.orderIsValid(item)) {
      table.status = 'in progress';
      table.addItem(item);
      table.updateTotalOrderPrice(item);

      form.reset();
    }
  }
}
