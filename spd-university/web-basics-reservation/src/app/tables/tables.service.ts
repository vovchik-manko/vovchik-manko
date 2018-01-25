import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/from';

import { Table, tableStatus, TableGroup } from './models/tables.model';
import { IOrder, Order, orderStatus } from './models/order.model';

@Injectable()
export class TablesService {
  private tableGroups: number[] = [2, 4, 8];
  private tables: Table[];

  private appUrl: string = 'http://localhost:8888/tables';

  constructor(private http: HttpClient) {}

  getTables(): Observable<Table[]> {
    return new Observable(o => {
      this.http.get(this.appUrl).subscribe((data: Table[]) => {
        let tables = data ? data.map(t => new Table(t)) : [];
        o.next(tables);
      });
    });
  }

  getTableGroups(): Observable<TableGroup[]> {
    let tableGroups: TableGroup[];
    return new Observable(o => {
      this.getTables()
        .subscribe(tables => {
          tableGroups = [
            ...this.tableGroups.map(group => this.composeTableGroup(group, tables))
          ];
          o.next(tableGroups);
        });
    });
  }

  getTable(id: number): Observable<Table> {
    return new Observable(o => {
      this.http.get(this.appUrl + '/' + id).subscribe((data: Table) => {
        if(data) {
          let table = new Table(data);
          o.next(table);
        }
      });
    });
  }

  getOrder(table: Table): Order {
    return table && table.orders ? table.orders.find(o => o.status === orderStatus.PENDING) : null;
  }

  processTable(table: Table): Observable<Table> {
    table.status = tableStatus.PROCESSING;

    let orderData: IOrder = {
      tableId: table.id,
      clientName: table.clientName,
      status: orderStatus.PENDING
    };
    table.orders.push(new Order(orderData));
    return this.updateTable(table);
  }

  updateTable(table: Table): Observable<Table> {
    let headers = { headers: new HttpHeaders().set('Authorization', 'my-auth-token') };

    return new Observable(o => {
      this.http.post(`${this.appUrl}/${table.id}`, table, headers).subscribe((data: Table) => {
        let table = new Table(data);
        o.next(table)
      });
    });
  }

  completeOrder(table: Table): Observable<Table> {
    let order: Order = this.getOrder(table);

    order.status = orderStatus.COMPLETE;
    table.status = tableStatus.AVAILABLE;
    table.clientName = null;

    return this.updateTable(table);
  }

  getTableTotal(table: Table): number {
    return table.orders.reduce((total: number, order: Order) => total + +order.total, 0);
  }

  private composeTableGroup(group: number, tables: Table[]): TableGroup {
    return {
      maxPersons: group,
      tables: tables.filter(table => table.maxPersons === group)
    }
  }

  private addOrders(table: Table, order: Order) {
    table.orders.push(order);
  }
}
