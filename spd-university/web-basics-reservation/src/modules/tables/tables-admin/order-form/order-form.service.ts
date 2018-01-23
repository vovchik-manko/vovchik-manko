import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { IOrder, ItemOrdered, Order, orderStatus } from '../../models/order.model';
import { Product } from "../../models/product.model";
import { PRODUCTS } from "../../models/products.mock";


@Injectable()
export class OrderFormService {
  orders: Order[] = [];

  getProducts(): Observable<Product[]> {
    return new Observable(observer => observer.next(PRODUCTS));
  }

  createOrder(orderData: IOrder): Observable<Order> {
    let order = new Order(orderData);

    this.orders.push(order);
    return new Observable(observer => observer.next(order));
  }

  async addItem(tableId: number, item: ItemOrdered): Promise<Order> {
    let order = await this.getOrder(tableId);

    order.itemsOrdered.push(item);
    order.total += this.getItemTotal(item);
    return order;
  }

  async getOrder(tableId: number): Promise<Order> {
    let orders = await this.getOrders();
    let order = orders.find(o => o.tableId === tableId && o.status === orderStatus.PENDING);

    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Promise.resolve(this.orders);
  }

  getItemTotal(item: ItemOrdered) {
    return item.price * item.number;
  }
}
