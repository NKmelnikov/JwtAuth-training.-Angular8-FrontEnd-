import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {BrandService, CategoryService, ProductDrillService} from '../../_services';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-products-drill',
  templateUrl: './products-drill.component.html',
  styleUrls: ['./products-drill.component.scss']
})
export class ProductsDrillHomeComponent implements OnInit {

  readonly typeDrill = 2;

  public productsDrillList = [];
  public productsToShow = [];
  public categoryList = [];
  public categoryToShow = {
    description: ''
  };
  public subcategoryToShow = {
    description: ''
  };
  public categoryToShowDefault = {
    description: ''
  };
  public subcategoryToShowDefault = {
    description: ''
  };
  public brandList = [];
  public selectedCategory;
  public selectedCategoryNameToShow = 'Все продукты';
  public selectedIndex;
  public env = environment;
  public page = 1;
  public pageSize = 12;


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
    private productDrillService: ProductDrillService,
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductsOilList();
  }

  getCategoryList() {
    this.categoryService.getAll()
      .subscribe(categoryList => {
        this.categoryList = categoryList.filter((el) => {
          return el.type === this.typeDrill;
        });

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
    this.productDrillService.getAll()
      .subscribe(productsOilList => {
        this.productsDrillList = productsOilList;
        this.productsToShow = this.productsDrillList;
      });
  }

  selectCategory(item) {
    this.categoryToShow = this.categoryToShowDefault;
    this.subcategoryToShow = this.subcategoryToShowDefault;
    const expansionDOM = document.getElementById(item._id.$oid);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    item.isExpanded = true;

    if (item.subCategories) {
      item.subCategories.forEach(el => {
        el.activeClass = false;
      });
    }

    if (this.selectedCategory === item.name && !isExpanded) {
      this.productsToShow = this.productsDrillList;
      this.selectedCategoryNameToShow = 'Все продукты';
    } else {
      this.categoryToShow = item;
      this.selectedCategory = item.name;
      this.selectedCategoryNameToShow = item.name;
      this.productsToShow = this.productsDrillList;

      if (!item.isBrand) {
        this.productsToShow = this.productsToShow.filter((el) => {
          return el.category._id.$oid === item._id.$oid;
        });
      }
    }
  }

  selectSubCategory(subcategory, list) {

    list.forEach(el => {
      el.activeClass = false;
    });

    this.subcategoryToShow = subcategory;
    subcategory.activeClass = true;
    this.selectedCategoryNameToShow = subcategory.name;
    this.productsToShow = this.productsDrillList;
    this.productsToShow = this.productsToShow.filter((el) => {
      if (el.subcategory !== 'null') {
        return el.subcategory.sub_id.$oid === subcategory.sub_id.$oid || el.brand._id.$oid === subcategory.sub_id.$oid;
      }
    });
  }
}
