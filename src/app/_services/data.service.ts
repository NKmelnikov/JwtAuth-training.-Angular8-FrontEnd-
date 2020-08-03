import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {

  constructor() {
  }

  private productsToShow = new Subject<Array<any>>();
  public showProducts$ = this.productsToShow.asObservable();

  // Service message commands
  showProducts(products: any[]) {
    this.productsToShow.next(products);
  }
}
