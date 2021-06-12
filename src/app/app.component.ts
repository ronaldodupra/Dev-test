import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { ProductsService } from "./products/products.service";
import { ProductShared } from "./shared/product.shared";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "ir-dev-test";
  constructor(
    private productService: ProductsService,
    private fb: FormBuilder
  ) {}
  dataSource: MatTableDataSource<ProductShared>;
  brands = [];
  startfiltering: boolean = true;
  // none value
  filterValues = {
    textFilter: "",
    brandFilter: "",
    stocksFilter: "all",
  };
  filterValuesNULL = {
    textFilter: "",
    brandFilter: "",
    stocksFilter: "all",
  };
  filterForm: FormGroup = this.fb.group({
    textFilter: [],
    brandFilter: [],
    stocksFilter: ["all"],
  });

  get textFilter() {
    return this.filterForm.get("textFilter");
  }
  get brandFilter() {
    return this.filterForm.get("brandFilter");
  }
  get stocksFilter() {
    return this.filterForm.get("stocksFilter");
  }
  ngOnInit() {
    this.getProducts();
    this.formSubscribe();
    this.getBrands();
    this.filterProducts();
  }
  public getProducts() {
    this.productService.getProducts().subscribe((result) => {
      this.dataSource = new MatTableDataSource<ProductShared>(result);
    });
  }
  // form subscribe
  formSubscribe() {
    this.textFilter.valueChanges.subscribe((positionValue) => {
      this.filterValues["textFilter"] = positionValue;
      if (
        this.textFilter.value.length > 2 ||
        this.textFilter.value.length == 0
      ) {
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    });

    this.brandFilter.valueChanges.subscribe((nameValue) => {
      this.filterValues["brandFilter"] = nameValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.stocksFilter.valueChanges.subscribe((emailValue) => {
      this.filterValues["stocksFilter"] = emailValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  // create filter

  public getBrands() {
    var brandFilter = this.dataSource.data.reduce(function (obj, item) {
      obj[item.brand] = obj[item.brand] || [];
      obj[item.brand].push(item.brand);
      return obj;
    }, {});

    var brandArray = Object.keys(brandFilter).map(function (key) {
      return { brand: key };
    });
    this.brands = brandArray;
  }

  filterProducts() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      var stockquantity;

      if (searchString.stocksFilter == "all") {
        stockquantity = data.quantity >= 0;
      } else if (searchString.stocksFilter == "out-of-stock") {
        stockquantity = data.quantity == 0;
      } else {
        stockquantity = data.quantity > 0;
      }
      const resultValue =
        (data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.textFilter.toLowerCase()) !== -1 ||
          data.brand
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.textFilter.toLowerCase()) !== -1 ||
          data.description
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(searchString.textFilter.toLowerCase()) !== -1) &&
        data.brand
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.brandFilter.toLowerCase()) !== -1 &&
        stockquantity; // => false;

      return resultValue;
    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
}
