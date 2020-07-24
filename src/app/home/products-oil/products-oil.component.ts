import {Component, OnInit, ViewChild} from '@angular/core';
import {BrandService, CategoryService, ProductOilService} from '../../_services';
import {MatAccordion} from '@angular/material/expansion';
import {environment} from '../../../environments/environment';


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
  public selectedCategory;
  public selectedIndex;
  public serverUrl;
  public page = 1;
  public pageSize = 5;
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
    private productOilService: ProductOilService
  ) {

  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductsOilList();
    this.serverUrl = environment.serverURL;
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
        this.productsOilList.map((el) => {
          el.productImgPath = `${environment.serverURL}${el.productImgPath}`;
        });
        this.productsToShow = this.productsOilList;
      });
  }

  selectProducts(selectItem) {
    const expansionDOM = document.getElementById(selectItem._id.$oid);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    if (selectItem.subCategories) {
      selectItem.subCategories.forEach(el => {
        el.activeClass = false;
      });
    }

    if (this.selectedCategory === selectItem.name && !isExpanded) {
      this.productsToShow = this.productsOilList;
    } else {
      this.selectedCategory = selectItem.name;
      this.productsToShow = this.productsOilList;
      if (!selectItem.isBrand) {
        this.productsToShow = this.productsToShow.filter((el) => {
          return el.category._id.$oid === selectItem._id.$oid;
        });
      }
    }
  }

  selectSubCategory(subcategory, list) {
    list.forEach(el => {
      el.activeClass = false;
    });

    subcategory.activeClass = true;
    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      if (el.subcategory !== 'null') {
        return el.subcategory.sub_id.$oid === subcategory.sub_id.$oid || el.brand._id.$oid === subcategory.sub_id.$oid;
      }
    });
  }

  selectProductsOil(product) {
    console.log(product);
  }
}
