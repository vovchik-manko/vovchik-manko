import { Component, OnInit } from '@angular/core';

import { TablesService } from '../tables.service';
import { Table } from '../models/tables.model';
import { Order, orderStatus } from "../models/order.model";

@Component({
  templateUrl: './tables-history.component.html'
})
export class TablesHistoryComponent implements OnInit {
  tables: Table[];

  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.tablesService.getTables()
      .subscribe(data => this.tables = data);
  }

  getTableTotal(table: Table): number {
    return this.tablesService.getTableTotal(table);
  }

  getCompletedOrders(table: Table): Order[] {
    return table.orders.filter(o => o.status === orderStatus.COMPLETE).reverse();
  }

  getCurrentOrderTotal(table: Table): number {
    let order = this.tablesService.getOrder(table);
    return order ? order.total : 0;
  }
}
