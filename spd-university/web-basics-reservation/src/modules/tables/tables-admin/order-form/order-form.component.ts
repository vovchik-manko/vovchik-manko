import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

import { OrderFormService } from './order-form.service';
import { Table, Visitor } from '../../models/tables.model';
import { Order, ItemOrdered } from '../../models/order.model';
import { TablesService } from '../../tables.service';
import { Product } from "../../models/product.model";


@Component({
  selector: 'vm-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  viewCheck: boolean = false;
  numbers: number[] = Array.from(new Array(20), (x, i) => i + 1);
  products: Product[];

  table: Table;
  order: Order;
  visitor: Visitor;

  orderItemForm: FormGroup;
  clientForm: FormGroup;
  errRequired: string = 'Field is required';

  private defaultOrderItem = {
    title: '',
    quantity: ''
  };

  constructor(
    private tablesService: TablesService,
    private orderFormService: OrderFormService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createClientForm();
    this.createOrderItemForm();
  }

  ngOnInit() {
    this.initData();
  }

  submitClientForm() {
    this.clientForm.markAsTouched();
    if(this.clientForm.invalid) {
      return;
    }

    let tableId: number = this.table.getTableId();

    this.visitor = {
      tableId: tableId,
      clientName: this.clientForm.value.clientName,
      totalOrderPrice: 0
    };
    Observable.fromPromise(this.tablesService.processTable(tableId, this.visitor))
      .subscribe((res: boolean) => {
        let orderData = {
          tableId: tableId,
          clientName: this.visitor.clientName
        };
        this.orderFormService.createOrder(orderData)
          .subscribe((res: Order) => {
            this.order = res;
            this.orderItemForm.enable();
          });
      });
  }

  addOrderItem() {
    if(this.orderItemForm.invalid) {
      this.orderItemForm.markAsTouched();
      return;
    }

    let itemFormValue = this.orderItemForm.value;
    let orderedItem = this.composeOrderedItem(itemFormValue);

    Observable.fromPromise(this.orderFormService.addItem(this.order.tableId, orderedItem))
      .subscribe(
        (res: Order) => {
          this.order = res;
          this.resetForm(this.orderItemForm, this.defaultOrderItem);
        },
        (err) => console.log('err: ', err)
      );
  }

  processOrder() {
    this.addOrderItem();
    this.viewPaycheck();
  }

  completeOrder() {
    Observable.fromPromise(this.tablesService.completeOrder(this.order, this.visitor))
      .subscribe((res: boolean) => {
        if(res) {
          this.order = null;
          this.resetForms();
          this.removePaycheck();
        }
      });
  }

  viewPaycheck() {
    this.viewCheck = true;
  }

  removePaycheck() {
    this.viewCheck = false;
  }

  private initData() {
    this.route.params.subscribe(async (params) => {
      let id: number = +params.id;
      this.table = await this.tablesService.getTable(id);
      this.order = await this.orderFormService.getOrder(this.table.getTableId());

      this.updateForms();
    });

    this.orderFormService.getProducts()
      .subscribe(data => this.products = data);
  }

  private createOrderItemForm() {
    this.orderItemForm = this.fb.group({
      title: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  private createClientForm() {
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required]
    });
  }

  private updateForms() {
    let noName: boolean = !this.table.clientName;
    if(noName) {
      this.resetForms();
      return;
    }

    let defaultClientData = {
      clientName: this.table.clientName
    };
    this.resetForm(this.clientForm, defaultClientData);
    this.resetForm(this.orderItemForm, this.defaultOrderItem);
    this.orderItemForm.enable();
  }

  private resetForms() {
    let defaultClientData = {
      clientName: this.table.clientName
    };
    this.resetForm(this.clientForm, defaultClientData);
    this.resetForm(this.orderItemForm, this.defaultOrderItem);
    this.clientForm.enable();
    this.orderItemForm.disable();
  }

  private resetForm(form: FormGroup, data: any) {
    form.markAsUntouched();
    form.setValue(data);
  }

  private composeOrderedItem(formValue: any): ItemOrdered {
    let title = formValue.title;
    let number = +formValue.quantity;
    let product = this.products.find(p => p.title === formValue.title);
    let price = product ? +product.price : 0;
    let total = number * price;

    return {
      title,
      number,
      price,
      total
    };
  }
}
