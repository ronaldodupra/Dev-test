import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../shared/material.module";

import { ProductsGridComponent } from "./products-grid.component";
import { ProductsService } from "./products.service";

@NgModule({
  imports: [BrowserModule, MaterialModule],
  declarations: [ProductsGridComponent],
  exports: [ProductsGridComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
