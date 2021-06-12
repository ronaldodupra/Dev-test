import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./products/products.service";
import { ProductShared } from "./shared/product.shared";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ir-dev-test";
  constructor(private productService: ProductsService) {}
  products: ProductShared[];
  brands = [];
  ngOnInit() {
    this.getProducts();
  }
  public getProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.products = result;

      var brandFilter = result.reduce(function (obj, item) {
        obj[item.brand] = obj[item.brand] || [];
        obj[item.brand].push(item.brand);
        return obj;
      }, {});

      var brandArray = Object.keys(brandFilter).map(function (key) {
        return { brand: key };
      });
      this.brands = brandArray;
    });
  }
}
