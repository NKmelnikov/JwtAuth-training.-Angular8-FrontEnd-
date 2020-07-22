import {Component, OnInit, ViewChild} from '@angular/core';
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
  public selectedBrand;
  public selectedCategory;

  @ViewChild('accordion') accordion: MatAccordion;

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

  getBrandList() {
    this.brandService.getAll()
      .subscribe(brandService => {
        this.brandList = brandService;
      });
  }

  getProductsOilList() {
    this.productOilService.getAll()
      .subscribe(productsOilList => {
        this.productsOilList = productsOilList;
        this.productsToShow = this.productsOilList;
      });
  }


  selectCategory(category) {
    this.toggleActive('.mat-expansion-panel', category);
    if (this.selectedCategory === category.categoryName) {
      this.productsToShow = this.productsOilList;
    } else {
      this.selectedCategory = category.categoryName;
      this.productsToShow = this.productsOilList;
      this.productsToShow = this.productsToShow.filter((el) => {
        return el.category._id.$oid === category._id.$oid;
      });
    }
  }

  selectSubCategory(subcategory) {
    this.toggleActive('.sub-categories-item', subcategory);
    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      return el.subcategory.sub_id.$oid === subcategory.sub_id.$oid;
    });
  }

  selectBrand(brand) {
    this.toggleActive('.brand-container', brand);
    if (this.selectedBrand === brand.brandName) {
      this.productsToShow = this.productsOilList;
    } else {
      this.selectedBrand = brand.brandName;
      this.productsToShow = this.productsOilList;
      this.productsToShow = this.productsToShow.filter((el) => {
        return el.brand._id.$oid === brand._id.$oid;
      });
    }
  }

  toggleActive(elementClass, element) {
    console.log(elementClass);
    console.log(element);
    console.log(this.categoryList);
    // TODO active subcategory bug
    const subcategoriesDOM = document.querySelectorAll(elementClass);
    // remove active class from all subcategories
    [].forEach.call(subcategoriesDOM, (el) => {
      el.className = el.className.replace(/\bactive\b/, '');
    });

    element.activeClass = true;
  }

  // performSelection(entity, selectedEntity) {
  //   if (selectedEntity === entity[`${entity}Name`]) {
  //     this.productsToShow = this.productsOilList;
  //   } else {
  //     if(selectedEntity){
  //     }
  //     selectedEntity = entity[`${entity}Name`];
  //     this.productsToShow = this.productsOilList;
  //     this.productsToShow = this.productsToShow.filter((el) => {
  //       return el[entity]._id.$oid === entity._id.$oid;
  //     });
  //   }
  // }

  selectProductsOil(product) {
    console.log(product);
  }
}
