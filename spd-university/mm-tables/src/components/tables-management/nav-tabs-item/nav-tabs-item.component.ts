import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ITable } from '../../table/table.model';

@Component({
  moduleId: module.id,
  selector: 'vm-nav-tabs-item',
  templateUrl: './nav-tabs-item.component.html',
  styleUrls: ['./nav-tabs-item.component.css']
})
export class NavTabsItemComponent {
  @Input('table') data: ITable;

  @Output() tabPaneIsSelected = new EventEmitter<number>();

  showTabContent(event: Event, id: number) {
    event.preventDefault();
    this.tabPaneIsSelected.emit(id);
  }
}
