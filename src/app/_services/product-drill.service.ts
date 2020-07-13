import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductsDrillInterface} from '../admin/products-drill/products-drill.interface';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class ProductDrillService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('get-products-drill');
  }

  create(data: ProductsDrillInterface) {
    return super.create(data, 'create-product-drill');
  }

  update(data: ProductsDrillInterface) {
    return super.create(data, 'update-product-drill');
  }

  delete(data: ProductsDrillInterface) {
    return super.delete(data, 'delete-product-drill');
  }

  updatePosition(data: ProductsDrillInterface) {
    return super.updatePosition(data, 'update-product-drill-position');
  }

  bulkActivate(data: ProductsDrillInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-products-drill');
  }

  bulkDeactivate(data: ProductsDrillInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-products-drill');
  }

  bulkDelete(data: ProductsDrillInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-products-drill');
  }
}
