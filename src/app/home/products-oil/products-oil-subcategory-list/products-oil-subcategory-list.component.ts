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
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-products-oil-list',
  templateUrl: './products-oil-subcategory-list.component.html',
  styleUrls: ['./products-oil-subcategory-list.component.scss']
})
export class ProductsOilSubcategoryListComponent implements OnInit {

  subscription: Subscription;
  public env = environment;
  public page = 1;
  public pageSize = 10;
  public brandIsActive: boolean;

  public products = [{
    imgPath: '',
    name: '',
    description: '',
    spec: '',
    pdf1Path: '',
    pdf2Path: '',
    pdf1Name: '',
    pdf2Name: ''
  }];

  public productsToShow = [{
    imgPath: '',
    name: '',
    slug: '',
    description: '',
    spec: '',
    pdf1Path: '',
    pdf2Path: '',
    pdf1Name: '',
    pdf2Name: ''
  }];


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
      if (param.categorySlug !== 'brands') {
        this.brandIsActive = false;
        this.getProductBySubcategorySlug(param.subcategorySlug);
      } else {
        this.brandIsActive = true;
        this.getProductByBrandSlug(param.subcategorySlug);
      }
    });
  }

  getProductBySubcategorySlug(slug) {
    this.productOilService.getProductBySubcategorySlug(slug)
      .subscribe(products => {
        // @ts-ignore
        this.products = products;
        // @ts-ignore
        this.productsToShow = products;
        this.productsToShow['loaded'] = true;
      });
  }

  getProductByBrandSlug(slug) {
    this.productOilService.getProductByBrandSlug(slug)
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
}
