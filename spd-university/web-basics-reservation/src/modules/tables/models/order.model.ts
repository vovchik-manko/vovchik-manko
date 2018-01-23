export const orderStatus = {
  COMPLETE: 'complete',
  PENDING: 'pending'
};

export type ItemOrdered = {
  title: string;
  price: number;
  number: number;
  total: number;
}

export interface IOrder {
  tableId: number;
  clientName: string;
}

let orderId: number = 0;

export class Order implements IOrder {
  private id: number;

  tableId: number;
  clientName: string;
  status: string;

  itemsOrdered: ItemOrdered[] = [];
  total: number = 0;

  constructor(data: IOrder) {
    this.init(data);
  }

  public getId(): number {
    return this.id;
  }

  private init(data: IOrder) {
    if(!data) { return; }

    this.clientName = data.clientName;
    this.tableId = data.tableId;

    this.id = ++orderId;
    this.status = orderStatus.PENDING;
  }
}
