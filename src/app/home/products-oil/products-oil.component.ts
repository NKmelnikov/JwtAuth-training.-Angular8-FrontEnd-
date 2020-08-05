import {Component, OnInit, ViewChild} from '@angular/core';
import {BrandService, CategoryService, ProductOilService, DataService} from '../../_services';
import {MatAccordion} from '@angular/material/expansion';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';


@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilHomeComponent implements OnInit {

  public productsOilList = [];
  public productsToShow = [];
  public categoryList = [];
  public brandList = [];
  public selectedCategory;
  public selectedCategoryNameToShow = 'Все продукты';
  public selectedIndex;

  brandCategory = {
    _id: {$oid: '5f105534ed58762626brands'},
    active: 1,
    description: '',
    name: 'Брэнды',
    type: 1,
    isBrand: true,
    createdAt: {$date: 1594916708310},
    position: 999,
    subCategories: [],
  };


  @ViewChild('accordion') accordion: MatAccordion;

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productOilService: ProductOilService,
    private dataService: DataService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductsOilList();
  }

  getCategoryList() {
    this.categoryService.getAll()
      .subscribe(categoryList => {
        this.categoryList = categoryList;
        this.categoryList.push(this.brandCategory);

        this.brandService.getAll()
          .subscribe(brandList => {
            this.brandList = brandList;
            this.brandList.map((el) => {
              el.sub_id = el._id;
            });
            this.categoryList[this.categoryList.length - 1].subCategories = this.brandList;
          });
      });
  }

  getProductsOilList() {
    this.productOilService.getAll()
      .subscribe(productsOilList => {
        this.productsOilList = productsOilList;
        this.productsToShow = this.productsOilList;
        this.dataService.showProducts(this.productsToShow);
      });
  }

  selectCategory(item) {
    const expansionDOM = document.getElementById(item._id.$oid);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    item.isExpanded = true;

    if (item.subCategories) {
      item.subCategories.forEach(el => {
        el.activeClass = false;
      });
    }

    if (this.selectedCategory === item.name && !isExpanded) {
      this.productsToShow = this.productsOilList;
      this.selectedCategoryNameToShow = 'Все продукты';
    } else {
      this.selectedCategory = item.name;
      this.selectedCategoryNameToShow = item.name;
      this.productsToShow = this.productsOilList;
      if (!item.isBrand) {
        this.productsToShow = this.productsToShow.filter((el) => {
          return el.category._id.$oid === item._id.$oid;
        });
      }
    }

    this.dataService.showProducts(this.productsToShow);
  }

  selectSubCategory(subcategory, list) {
    list.forEach(el => {
      el.activeClass = false;
    });

    subcategory.activeClass = true;
    this.selectedCategoryNameToShow = subcategory.name;
    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      if (el.subcategory !== 'null') {
        return el.subcategory.sub_id.$oid === subcategory.sub_id.$oid || el.brand._id.$oid === subcategory.sub_id.$oid;
      }
    });


    this.dataService.showProducts(this.productsToShow);
  }
}
