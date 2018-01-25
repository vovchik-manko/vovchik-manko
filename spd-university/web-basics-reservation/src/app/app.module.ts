import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from "./shared/shared.module";
import { TablesModule } from "./tables/tables.module";
import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    TablesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
