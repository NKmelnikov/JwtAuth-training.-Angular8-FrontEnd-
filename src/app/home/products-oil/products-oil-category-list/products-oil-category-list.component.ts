import {
  Component,
  OnInit
} from '@angular/core';
import {
  ProductOilService,
  DataService
} from '../../../_services';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {ProductsOilDialogHomeComponent} from '../products-oil-dialog-home/products-oil-dialog-home.component';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products-oil-list',
  templateUrl: './products-oil-category-list.component.html',
  styleUrls: ['./products-oil-category-list.component.scss']
})
export class ProductsOilCategoryListComponent implements OnInit {

  productsToShow = [];
  subscription: Subscription;
  public products = [{
    imgPath: '',
    name: '',
    slug: '',
    description: '',
    spec: '',
    category_slug: '',
    subcategory_slug: '',
    pdf1Path: '',
    pdf2Path: '',
    pdf1Name: '',
    pdf2Name: ''
  }];

  description;
  spec;
  public env = environment;
  public page = 1;
  public pageSize = 10;

  constructor(
    private productOilService: ProductOilService,
    private dataService: DataService,
    private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
  ) {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param) => {
      this.getProductByCategorySlug(param.categorySlug);
    });
  }

  getProductByCategorySlug(slug) {
    this.productOilService.getProductByCategorySlug(slug)
      .subscribe(products => {
        // @ts-ignore
        this.products = products;
        // @ts-ignore
        this.productsToShow = products;
        this.productsToShow['loaded'] = true;
      });
  }

  openDialog(action, obj) {
    obj = obj || {};
    obj.action = action;
    this.dialog.open(ProductsOilDialogHomeComponent, {
      width: '320px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });
  }

  onPageChange() {
    if (window.innerWidth < 1024) {
      window.scrollTo(0, 900);
    } else {
      window.scrollTo(0, 0);
    }
  }
}
