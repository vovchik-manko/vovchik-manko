import { Order } from './order.model';

export type Visitor = {
  tableId: number;
  clientName: string;
  totalOrderPrice: number;
}

export type TableGroup = {
  maxPersons: number;
  tables: Table[];
}

export let tableStatus = {
  RESERVED: 'reserved',
  AVAILABLE: 'available',
  PROCESSING: 'processing'
};

let tableIdNext = 0;

export class Table {
  private tableId: number;
  private maxPersons: number;

  public clientName: string = '';
  public status: string = tableStatus.AVAILABLE;
  public visitors: Visitor[] = [];
  public orders: Order[] = [];

  constructor(maxPersons: number) {
    this.init(maxPersons);
  }

  public getTableId(): number {
    return this.tableId;
  }

  public getMaxPersons(): number {
    return this.maxPersons;
  }

  private init(maxPersons: number) {
    if(!maxPersons) {
      return;
    }

    this.tableId = ++tableIdNext;
    this.maxPersons = maxPersons;
  }
}
