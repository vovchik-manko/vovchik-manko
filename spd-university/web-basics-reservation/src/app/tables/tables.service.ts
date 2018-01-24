import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';

import { Table, tableStatus, Visitor, TableGroup } from './models/tables.model';
import { ItemOrdered, Order, orderStatus } from './models/order.model';
import { TABLES } from './models/tables.mock';

@Injectable()
export class TablesService implements OnInit {
  private tableGroups: number[] = [2, 4, 8];
  private tables: Table[];
  private orders: Order[];
  private visitors: Visitor[] = [];

  private appUrl: string = 'http://localhost:8080/tables';

  constructor(private http: HttpClient) {
    this.initData();
  }

  ngOnInit() {
    this.http.get(this.appUrl).subscribe((data: any) => {
      console.log('start: ', data, data.json());
    });
  }

  getTables(): Table[] {
    console.log('get tables..');
    this.http.get(this.appUrl).subscribe((data: any) => {
      console.log('start: ', data, data.json());
    });
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

  async completeOrder(order: Order): Promise<boolean> {
    let table = await this.getTable(order.tableId);
    let visitor = await this.getVisitor(order.tableId, order.clientName);

    visitor.totalOrderPrice = order.total;
    order.clientName = visitor.clientName;
    order.status = orderStatus.COMPLETE;
    this.addVisitors(table, visitor);
    this.addOrders(table, order);
    table.status = tableStatus.AVAILABLE;
    table.clientName = null;

    return true;
  }

  updateVisitors(visitor: Visitor) {
    this.visitors.push(visitor);
  }

  getVisitor(tableId: number, clientName: string): Visitor {
    return this.visitors.find(v => v.tableId === tableId && v.clientName === clientName);
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
