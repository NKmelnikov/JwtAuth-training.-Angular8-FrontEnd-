import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BrandService, CategoryService, ProductOilService} from '../../_services';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilHomeComponent implements OnInit {

  public categoryList;
  public brandList;
  public productsOilList;
  public productsToShow;
  public expanded;
  public prodTemp;

  @ViewChild(MatAccordion) accordion: MatAccordion;


  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productOilService: ProductOilService
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getBrandList();
    this.getProductsOilList();
  }

  getCategoryList() {
    this.categoryService.getAll()
      .subscribe(categoryList => {
        this.categoryList = categoryList;
      });
  }

  getBrandList(){
    this.brandService.getAll()
      .subscribe(brandService => {
        this.brandList = brandService;
      });
  }

  getProductsOilList(){
    this.productOilService.getAll()
      .subscribe(productsOilList => {
        this.productsOilList = productsOilList;
        this.productsToShow = this.productsOilList;
      });
  }


  selectCategory(category) {

    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      return el.category._id.$oid === category._id.$oid;
    });

    // console.log(this.accordion);
    // console.log(this.productsOilList);
  }

  selectSubCategory(subcategory) {
    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      return el.subcategory.sub_id.$oid === subcategory.sub_id.$oid;
    });
  }

  selectBrand(brand) {
    // console.log(brand);
  }

  selectProductsOil(product) {
    // console.log(product);
  }

  trackExpanded($event){
    // console.log($event);
  }

  isExpansionPanelClosed(){
    this.getProductsOilList();
  }
}
