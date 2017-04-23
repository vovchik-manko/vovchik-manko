import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { appRouting } from "./app.routes";

import { TablesModule } from '../components/tables.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    appRouting,
    TablesModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
