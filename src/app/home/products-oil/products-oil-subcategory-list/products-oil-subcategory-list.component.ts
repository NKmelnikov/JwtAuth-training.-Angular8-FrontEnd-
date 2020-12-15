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
  templateUrl: './products-oil-subcategory-list.component.html',
  styleUrls: ['./products-oil-subcategory-list.component.scss']
})
export class ProductsOilSubcategoryListComponent implements OnDestroy {

  productsToShow = [];
  subscription: Subscription;
  public env = environment;
  public page = 1;
  public pageSize = 10;
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


  constructor(
    private productOilService: ProductOilService,
    private dataService: DataService,
    private dialog: MatDialog
  ) {
    this.subscription = dataService.showProducts$.subscribe(products => {
      this.productsToShow = products;
      this.productsToShow['loaded'] = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getProductBySubcategorySlug();
  }

  getProductBySubcategorySlug() {
    const slug = document.location.pathname.split('/');
    const data = JSON.stringify(slug[slug.length - 1]);
    this.productOilService.getProductBySubcategorySlug(data)
      .subscribe(products => {
        // @ts-ignore
        this.products = products;
        console.log(this.products);
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
