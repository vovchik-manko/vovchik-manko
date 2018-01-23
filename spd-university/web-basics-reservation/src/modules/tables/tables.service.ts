import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { Table, tableStatus, Visitor, TableGroup } from './models/tables.model';
import { ItemOrdered, Order, orderStatus } from './models/order.model';
import { TABLES } from './models/tables.mock';

@Injectable()
export class TablesService {
  private tableGroups: number[] = [2, 4, 8];
  private tables: Table[];
  private orders: Order[];

  constructor() {
    this.initData();
  }

  getTables(): Table[] {
    return this.tables;
  }

  getTableGroups(): Array<TableGroup> {
    return [
      ...this.tableGroups.map(group => this.composeTableGroup(group, TABLES))
    ];
  }

  async getTable(id: number): Promise<Table> {
    let tables = await this.getTables() || [];
    let table = tables.find(t => t.getTableId() === id);

    return table;
  }

  async processTable(tableId: number, visitor: Visitor): Promise<boolean> {
    let table = await this.getTable(tableId);
    table.clientName = visitor.clientName;
    table.status = tableStatus.PROCESSING;

    return true;
  }

  async completeOrder(order: Order, visitor: Visitor): Promise<boolean> {
    let table = await this.getTable(order.tableId);

    visitor.totalOrderPrice = order.total;
    order.clientName = visitor.clientName;
    order.status = orderStatus.COMPLETE;
    this.addVisitors(table, visitor);
    this.addOrders(table, order);
    table.status = tableStatus.AVAILABLE;
    table.clientName = null;

    return true;
  }

  private initData() {
    this.loadTables().subscribe((data: Table[]) => {
      this.tables = data || [];
    });
    this.loadOrders().subscribe((data: Order[]) => {
      this.orders = data || [];
    });
  }

  private loadTables(): Observable<Table[]> {
    return new Observable(observer => observer.next(TABLES));
  }

  private loadOrders(): Observable<Order[]> {
    return new Observable(observer => observer.next([]));
  }

  private composeTableGroup(group: number, tables: Table[]): TableGroup {
    return {
      maxPersons: group,
      tables: tables.filter(table => table.getMaxPersons() === group)
    }
  }

  private addVisitors(table: Table, visitor: Visitor) {
    table.visitors.push(visitor);
  }

  private addOrders(table: Table, order: Order) {
    table.orders.push(order);
  }
}
