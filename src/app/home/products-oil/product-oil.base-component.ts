import {ChangeDetectorRef, HostListener, Directive, Injector, ViewChild} from '@angular/core';
import {BrandService, ProductOilService, CategoryService} from '../../_services';
import {environment} from '../../../environments/environment';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ProductOilBaseComponent {
  public categoryList = [];
  public brandList = [];
  public productsOilList: any[];
  public productsToShow: any[];
  public selectedCategory;
  public brandCategory: {
    _id: { $oid: '5f105534ed58762626brands' },
    active: 1,
    description: '',
    name: 'Брэнды',
    type: 1,
    isBrand: true,
    createdAt: { $date: 1594916708310 },
    position: 999,
    subCategories: [],
  };
  public brandService: BrandService;
  public categoryService: CategoryService;
  public productOilService: ProductOilService;

  protected constructor(private injectorObj: Injector) {
    this.brandService = this.injectorObj.get(BrandService);
    this.categoryService = this.injectorObj.get(CategoryService);
    this.productOilService = this.injectorObj.get(ProductOilService);
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
      });
  }

  selectCategory(item) {
    const expansionDOM = document.getElementById(item._id.$oid);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    if (item.subCategories) {
      item.subCategories.forEach(el => {
        el.activeClass = false;
      });
    }

    if (this.selectedCategory === item.name && !isExpanded) {
      this.productsToShow = this.productsOilList;
    } else {
      this.selectedCategory = item.name;
      this.productsToShow = this.productsOilList;
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

    subcategory.activeClass = true;
    this.productsToShow = this.productsOilList;
    this.productsToShow = this.productsToShow.filter((el) => {
      if (el.subcategory !== 'null') {
        return el.subcategory.sub_id.$oid === subcategory.sub_id.$oid || el.brand._id.$oid === subcategory.sub_id.$oid;
      }
    });
  }

}
