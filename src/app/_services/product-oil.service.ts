import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductsOilInterface} from '../admin/products-oil/products-oil.interface';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class ProductOilService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('get-products-oil');
  }

  create(data: ProductsOilInterface) {
    return super.create(data, 'create-product-oil');
  }

  update(data: ProductsOilInterface) {
    return super.create(data, 'update-product-oil');
  }

  delete(data: ProductsOilInterface) {
    return super.delete(data, 'delete-product-oil');
  }

  updatePosition(data: ProductsOilInterface) {
    return super.updatePosition(data, 'update-product-oil-position');
  }

  bulkActivate(data: ProductsOilInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-products-oil');
  }

  bulkDeactivate(data: ProductsOilInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-products-oil');
  }

  bulkDelete(data: ProductsOilInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-products-oil');
  }
}
