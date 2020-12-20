import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {

  constructor() {
  }

  private selectedProduct = new Subject();
  public selectProduct$ = this.selectedProduct.asObservable();

  // Service message commands
  selectProduct(products: any[]) {
    setTimeout(() => {
      this.selectedProduct.next(products);
    }, 0);
  }
}
