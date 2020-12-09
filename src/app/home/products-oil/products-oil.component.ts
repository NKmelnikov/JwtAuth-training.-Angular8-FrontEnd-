import {Component, OnInit, ViewChild} from '@angular/core';
import {BrandService, CategoryService, ProductOilService, DataService} from '../../_services';
import {MatAccordion} from '@angular/material/expansion';
import {CatalogsDialogComponent} from '../../admin/catalogs/catalogs-dialog/catalogs-dialog.component';
import {ProductsOilDialogHomeComponent} from './products-oil-dialog-home/products-oil-dialog-home.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilHomeComponent implements OnInit {

  readonly typeOil = 1;

  public productsOilList = [];
  public productsToShow = [];
  public categoryList = [];
  public brandList = [];
  public selectedCategory;
  public selectedNameToShow = 'Все продукты';
  public selectedIndex;

  brandCategory = {
    id: 999,
    active: 1,
    description: '',
    name: 'бренды',
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
    private productOilService: ProductOilService,
    private dataService: DataService,
    private dialog: MatDialog
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
          return el.type === this.typeOil;
        });

        this.categoryList.push(this.brandCategory);
        this.brandService.getAll()
          .subscribe(brandList => {
            this.brandList = brandList;
            this.brandList = this.brandList.map(brand => ({
              ...brand,
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
    this.productOilService.getAll()
      .subscribe(productsOilList => {
        this.productsOilList = productsOilList;
        this.productsToShow = this.productsOilList;
        // @ts-ignore
        this.dataService.showProducts(this.productsToShow);
      });
  }

  selectCategory(item) {
    const expansionDOM = document.getElementById('category_' + item.id);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    item.isExpanded = true;

    if (item.subcategories) {
      item.subcategories.forEach(el => {
        el.activeClass = false;
      });
    }

    if (this.selectedCategory === item.name && !isExpanded) {
      this.productsToShow = this.productsOilList;
      document.getElementById('current-view-name').textContent = String('Все продукты');
    } else {
      document.getElementById('current-view-name').textContent = String(item.name);
      this.selectedCategory = item.name;
      this.productsToShow = this.productsOilList;

      if (!item.isBrand) {
        this.productsToShow = this.productsToShow.filter((el) => {
          return el.category_id === item.id;
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
    document.getElementById('current-view-name').textContent = String(subcategory.name);

    this.productsToShow = this.productsOilList;

    this.productsToShow = this.productsToShow.filter((el) => {

      if (el !== 'null') {
        return el.subcategory_id === subcategory.sub_uid || el.brand_id === subcategory.brand_uid;
      }
    });

    this.dataService.showProducts(this.productsToShow);
  }
}
