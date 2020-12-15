import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductsOilInterface} from '../admin/products-oil/products-oil.interface';
import {Service} from './service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProductOilService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getProductBySlug(slug): Observable<ProductsOilInterface> {
    return this.http.post<ProductsOilInterface>(`${environment.serverURL}home/get-product-oil-by-slug`, {slug});
  }

  getProductByCategorySlug(slug): Observable<ProductsOilInterface> {
    return this.http.post<ProductsOilInterface>(`${environment.serverURL}home/get-product-oil-by-category-slug`, {slug});
  }

  getProductBySubcategorySlug(slug): Observable<ProductsOilInterface> {
    return this.http.post<ProductsOilInterface>(`${environment.serverURL}home/get-product-oil-by-subcategory-slug`, {slug});
  }

  getAll(): Observable<any[]> {
    return super.getAll('home/get-products-oil');
  }

  create(data: ProductsOilInterface) {
    return super.create(data, 'create-product-oil');
  }

  update(data: ProductsOilInterface) {
    return super.create(data, 'update-product-oil');
  }

  copy(data: ProductsOilInterface) {
    return super.copy(data, 'copy-product-oil');
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
