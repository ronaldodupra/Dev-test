import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
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
  @Input() dataSource: MatTableDataSource<ProductShared>[];
  displayedColumns = [
    "id",
    "name",
    "brand",
    "price",
    "quantity",
    "description",
  ];
  ngOnInit(): void {}
}
