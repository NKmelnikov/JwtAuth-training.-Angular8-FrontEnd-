import {Component, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {BrandService, CategoryService, ProductDrillService} from '../../_services';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

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

  descriptionInnerHtml: SafeHtml = '';


  brandCategory = {
    id: 555,
    active: 1,
    description: '',
    name: 'Брэнды',
    type: 1,
    isBrand: true,
    createdAt: {$date: 1594916708310},
    position: 999,
    subcategories: [],
  };


  @ViewChild('accordion') accordion: MatAccordion;

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productDrillService: ProductDrillService,
    private sanitizer: DomSanitizer
  ) {
    this.descriptionInnerHtml = this.getInnerHTMLValue();
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
            this.brandList = this.brandList.map(brand => ({
              ...brand,
              description: '',
              brand_uid: brand.id
            }));

            this.categoryList.forEach(el => {
              el.subcategories = el.subcategories.map(sub => ({
                ...sub,
                sub_uid: sub.id
              }));
            });

            this.categoryList[this.categoryList.length - 1].subcategories = this.brandList;
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
    const expansionDOM = document.getElementById('category_' + item.id);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    item.isExpanded = true;

    if (item.subcategories) {
      item.subcategories.forEach(el => {
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
          return el.category_id === item.id;
        });
      }
    }
  }

  selectSubCategory(subcategory, list) {
    list.forEach(el => {
      el.activeClass = false;
    });

    this.subcategoryToShow = subcategory;
    // @ts-ignore
    this.descriptionInnerHtml = this.getInnerHTMLValue();
    subcategory.activeClass = true;
    this.selectedCategoryNameToShow = subcategory.name;
    this.productsToShow = this.productsDrillList;
    this.productsToShow = this.productsToShow.filter((el) => {
      if (el !== 'null') {
        return el.subcategory_id === subcategory.sub_uid || el.brand_id === subcategory.brand_uid;
      }
    });
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  getInnerHTMLValue() {
    return this.sanitizer.bypassSecurityTrustHtml(this.subcategoryToShow.description);
  }

}
