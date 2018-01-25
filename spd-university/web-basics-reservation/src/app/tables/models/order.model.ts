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

export type IOrder = {
  tableId: number;
  clientName: string;
  status: any;
}

export class Order implements IOrder {
  id: number;

  tableId: number;
  clientName: string;
  status: string;

  itemsOrdered: ItemOrdered[] = [];
  total: number = 0;

  constructor(data: IOrder) {
    this.init(data);
  }

  private init(data: IOrder) {
    if(!data) { return; }

    this.clientName = data.clientName;
    this.tableId = data.tableId;
    this.status = data.status;
  }
}
