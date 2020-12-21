import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  BrandService,
  CategoryService,
  ProductOilService,
  DataService
} from '../../_services';
import {MatAccordion} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {HostListener} from '@angular/core';


@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})

export class ProductsOilHomeComponent implements OnInit {

  readonly typeOil = 1;

  public productsOilList = [];
  public categoryList = [];
  public brandList = [];
  public expandPanels = [];
  public selectedCategory = null;
  public selectedSubcategory = null;
  public selectedProduct = null;
  public selectedNameToShow = 'Все продукты';
  public urlParamProduct;
  public urlParamSubcategory;
  public urlParamCategory;
  public pathArray;


  @ViewChild('accordion') accordion: MatAccordion;

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productOilService: ProductOilService,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
  ) {

  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.createExpandPanels();
  }

  ngOnInit(): void {
    this.createExpandPanels();
    this.getProductsOilList();

    // @ts-ignore
    this.dataService.selectProduct$
      .subscribe(product => {
        this.createExpandPanels();
        this.selectedProduct = product;
        setTimeout(() => {
          this.selectedNameToShow = this.selectedProduct.name;
        }, 400);
      });
  }

  redirectTo(uri) {
    this.clearSelectedEntities();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  clearSelectedEntities() {
    this.selectedProduct = null;
    this.selectedSubcategory = null;
    this.selectedCategory = null;
    this.selectedNameToShow = 'Все продукты';
  }

  handleUrlPathParameters() {
    this.pathArray = window.location.pathname.split('/');
    this.urlParamProduct = this.pathArray[4] || null;
    this.urlParamSubcategory = this.pathArray[3] || null;
    this.urlParamCategory = this.pathArray[2] || null;
  }

  createExpandPanels() {
    this.clearSelectedEntities();
    this.handleUrlPathParameters();

    this.categoryService.getAll()
      .subscribe(categoryList => {
        // @ts-ignore
        this.categoryList = categoryList
          .filter(category => category.type === this.typeOil)
          .map(category => ({
            ...category,
            expanded: this.urlParamCategory === category.slug,
            subcategories: category.subcategories.map(sub => ({
              ...sub,
              active: this.urlParamSubcategory === sub.slug
            }))
          }));

        this.categoryList.push({
          id: 999,
          active: 1,
          description: '',
          name: 'Бренды',
          slug: 'brands',
          type: 1,
          isBrand: true,
          expanded: this.urlParamCategory === 'brands',
          createdAt: {$date: 1594916708310},
          position: 999,
          subcategories: [],
        });

        this.brandService.getAll()
          .subscribe(brandList => {
            this.brandList = brandList;
            this.brandList = this.brandList.map(brand => ({
              ...brand,
              active: this.urlParamSubcategory === brand.slug
            }));
            this.categoryList[this.categoryList.length - 1].subcategories = this.brandList;

            this.selectedCategory = this.categoryList.filter(category => category.expanded === true)[0];
            this.selectedNameToShow = this.selectedCategory.name != null ? this.selectedCategory.name : '';

            this.selectedSubcategory = this.selectedCategory?.subcategories.filter(sub => sub.active === true)[0];
            this.selectedNameToShow = this.selectedSubcategory.name != null ? this.selectedSubcategory.name : '';
          });
      });
  }

  getProductsOilList() {
    this.productOilService.getAll()
      .subscribe(productsOilList => {
        this.productsOilList = productsOilList;
      });
  }

  selectCategory(category) {
    this.selectedProduct = null;
    this.selectedSubcategory = null;
    this.selectedCategory = category;
    this.selectedNameToShow = category.name;

    const expansionDOM = document.getElementById(category.slug);
    const isExpanded = expansionDOM.classList.contains('mat-expanded');

    if (this.selectedCategory.name === category.name && !isExpanded) {
      this.selectedCategory = null;
      this.redirectTo('products');
    }

    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        subcategory.active = false;
      });
    }
  }

  selectSubcategory(subcategory, list?) {
    this.selectedProduct = null;
    this.selectedSubcategory = subcategory;
    this.selectedNameToShow = subcategory.name;


    list.forEach(el => {
      el.active = false;
    });
    subcategory.active = true;
  }
}
