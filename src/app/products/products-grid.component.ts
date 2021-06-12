import { Component, OnInit } from "@angular/core";
import { ProductShared } from "../shared/product.shared";
import { ProductsService } from "./products.service";

@Component({
  selector: "products-table",
  templateUrl: "products-grid.component.html",
  styleUrls: [],
  providers: [],
})
export class ProductsGridComponent implements OnInit {
  constructor(private productService: ProductsService) {}
  products: ProductShared[];
  ngOnInit(): void {
    this.loadProducts();
  }
  private loadProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;
    });
  }
}
