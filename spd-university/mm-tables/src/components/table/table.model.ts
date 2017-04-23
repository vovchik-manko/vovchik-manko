interface IItemOrdered {
  title: string;
  price: number;
  number: number;
}

interface IVisitor {
  tableId: number;
  clientName: string;
  totalOrderPrice: number;
}

interface ITable {
  tableId: number;
  maxPersons: number;
  clientName: string;
  status: string;
  itemsOrdered: IItemOrdered[];
  totalOrderPrice: number;
}

let tableIdNext = 0;

class Table {
  public tableId: number;
  public maxPersons: number;
  public clientName: string = '';
  public status: string = 'available';
  public itemsOrdered: IItemOrdered[] = [];
  public totalOrderPrice: number = 0;
  public visitors: IVisitor[] = [];

  constructor(maxPersons: number) {
    this.tableId = ++tableIdNext;
    this.maxPersons = maxPersons;
  }

  bookTable(name: string) {
    this.clientName = name;
    this.status = 'reserved';
  }

  addItem(item: IItemOrdered) {
    this.itemsOrdered.push(item);
  }

  updateTotalOrderPrice(item: IItemOrdered) {
    this.totalOrderPrice += item.price * item.number;
  }

  addVisitors(visitor: IVisitor) {
    this.visitors.unshift(visitor);
  }

  initOrder() {
    this.addVisitors({
        clientName: this.clientName,
        tableId: this.tableId,
        totalOrderPrice: this.totalOrderPrice
    });

    this.status = 'available';
    this.clientName = '';
    this.totalOrderPrice = 0;
    this.itemsOrdered = [];
  }
}

export {IItemOrdered, IVisitor, ITable, Table}
