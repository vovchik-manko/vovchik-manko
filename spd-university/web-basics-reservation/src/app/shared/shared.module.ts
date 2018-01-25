import { NgModule } from "@angular/core";

import { PageNotFoundComponent } from "./not-found.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PageNotFoundComponent
  ],
  exports: [
    PageNotFoundComponent,
    CommonModule
  ]
})
export class SharedModule {}
