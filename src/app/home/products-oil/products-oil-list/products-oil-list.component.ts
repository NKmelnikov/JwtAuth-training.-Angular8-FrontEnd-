import {
  Component,
  OnDestroy
} from '@angular/core';
import {
  ProductOilService,
  DataService
} from '../../../_services';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';
import {ProductsOilDialogHomeComponent} from '../products-oil-dialog-home/products-oil-dialog-home.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-products-oil-list',
  templateUrl: './products-oil-list.component.html',
  styleUrls: ['./products-oil-list.component.scss']
})
export class ProductsOilListComponent implements OnDestroy {

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

  public productsToShow = [{
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
    private dialog: MatDialog
  ) {

  }

  ngOnDestroy(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productOilService.getAll()
      .subscribe(products => {
        // @ts-ignore
        this.products = products;
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
