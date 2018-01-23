import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TablesModule } from "../modules/tables/tables.module";

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from '../components/not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    TablesModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
