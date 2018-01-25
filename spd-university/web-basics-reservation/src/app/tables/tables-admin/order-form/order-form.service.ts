import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ItemOrdered, Order } from '../../models/order.model';
import { Product } from "../../models/product.model";
import { PRODUCTS } from "../../models/products.mock";

@Injectable()
export class OrderFormService {
  orders: Order[] = [];

  getProducts(): Observable<Product[]> {
    return new Observable(observer => observer.next(PRODUCTS));
  }

  addItem(order: Order, item: ItemOrdered) {
    order.itemsOrdered.push(item);
    order.total += this.getItemTotal(item);
  }

  getItemTotal(item: ItemOrdered) {
    return item.price * item.number;
  }
}
