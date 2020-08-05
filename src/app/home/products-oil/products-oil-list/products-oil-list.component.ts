import {Component, OnDestroy} from '@angular/core';
import {ProductOilService, DataService} from '../../../_services';
import {environment} from '../../../../environments/environment';
import {Subscription} from 'rxjs';

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
  public pageSize = 5;

  constructor(
    private productOilService: ProductOilService,
    private dataService: DataService,
  ) {
    this.subscription = dataService.showProducts$.subscribe(products => {
      this.productsToShow = products;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
