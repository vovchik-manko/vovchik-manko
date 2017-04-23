import { Injectable } from '@angular/core';

import { IItemOrdered } from '../../table/table.model';

@Injectable()
export class OrderFormService {

  orderIsValid(item: IItemOrdered) {
    if (item.title.trim() === '' || !isNaN(+item.title)) {
      alert('Enter correct item title, please!');
      return;
    }
    if (isNaN(+item.price) || !item.price) {
      alert('Enter correct price, please!');
      return;
    }
    return true;
  }

}
