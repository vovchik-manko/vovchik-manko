import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { Order } from "../../models/order.model";

@Component({
  selector: 'vm-check',
  templateUrl: './check.component.html'
})
export class CheckComponent {
  @Input() order: Order;
}
