import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import 'rxjs/add/observable/fromPromise';

import { OrderFormService } from './order-form.service';
import { Table } from '../../models/tables.model';
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

    this.table.clientName = this.clientForm.value.clientName;

    this.tablesService.processTable(this.table)
      .subscribe((res: Table) => {
        this.table = res;
        this.order = this.tablesService.getOrder(this.table);
        this.orderItemForm.enable();
      });
  }

  addOrderItem() {
    if(this.orderItemForm.invalid) {
      this.orderItemForm.markAsTouched();
      return;
    }

    let itemFormValue = this.orderItemForm.value;
    let orderedItem = this.composeOrderedItem(itemFormValue);

    this.orderFormService.addItem(this.order, orderedItem);
    this.tablesService.updateTable(this.table)
      .subscribe(res => {
        this.table = res;
        this.order = this.tablesService.getOrder(this.table);
        this.resetForm(this.orderItemForm, this.defaultOrderItem);
      });
  }

  processOrder() {
    this.addOrderItem();
    this.viewPaycheck();
  }

  completeOrder() {
    this.tablesService.completeOrder(this.table)
      .subscribe((res: Table) => {
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
      this.tablesService.getTable(id)
        .subscribe((data: Table) => {
          this.table = data;
          if(this.table) {
            this.order = this.tablesService.getOrder(this.table);
            this.updateForms();
          }
        });
    });

    //ToDo: move request to BE
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
