import { Order } from './order.model';

export type TableGroup = {
  maxPersons: number;
  tables: Table[];
}

export let tableStatus = {
  AVAILABLE: 'available',
  PROCESSING: 'processing'
};

export class Table {
  id: number;
  maxPersons: number;

  clientName: string = '';
  status: string = tableStatus.AVAILABLE;
  orders: Order[] = [];

  constructor(data: Table) {
    this.init(data);
  }

  init(data: Table) {
    if(!data) {
      return;
    }

    this.id = data.id;
    this.maxPersons = data.maxPersons;
    this.clientName = data.clientName;
    this.status = data.status || tableStatus.AVAILABLE;
    this.orders = data.orders || [];
  }
}
