import { Injectable } from '@angular/core';

import { ITable } from './table.model';
import { TABLES } from './mock-tables';

@Injectable()
export class TableService {
  tableGroupsFeatures: number[] = [2, 4, 8];

  getTables(): ITable[] {
    return TABLES;
  }

  getTableGroups(): Array<ITable[]> {
    return [
      ...this.tableGroupsFeatures
        .map( feature => TABLES.filter(table => table.maxPersons === feature) )
    ];
  }
}
