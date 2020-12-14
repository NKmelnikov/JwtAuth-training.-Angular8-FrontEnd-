import {Component, OnDestroy} from '@angular/core';
import {ProductOilService, DataService} from '../../../_services';
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

  productsToShow = [];
  subscription: Subscription;
  public env = environment;
  public page = 1;
  public pageSize = 10;

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
