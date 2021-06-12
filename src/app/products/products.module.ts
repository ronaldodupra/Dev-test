import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ProductsGridComponent } from "./products-grid.component";
import { ProductsService } from "./products.service";

@NgModule({
  imports: [BrowserModule],
  declarations: [ProductsGridComponent],
  exports: [ProductsGridComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
