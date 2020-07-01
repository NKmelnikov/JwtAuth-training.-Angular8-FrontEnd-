import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProductsOilInterface} from '../admin/products-oil/products-oil.interface';

export class ProductOil {
  _id: object;
  brand_id: object;
  category_id: object;
  subCategory_id: object;
  createdAt: object;
  active: number;
  position: number;
  productName: number;
  productDescription: string;
  productSpec: string;
  productImgPath: string;
  productPdf1Path: string;
  productPdf2Path: string;
}


@Injectable({providedIn: 'root'})
export class ProductOilService {
  constructor(private http: HttpClient) {
  }


  getAll(): Observable<ProductOil[]> {
    return this.http.get<ProductOil[]>(`${environment.serverURL}get-products-oil`);
  }

  create(data: ProductsOilInterface) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}create-product-oil`, data);
  }


  update(data: ProductsOilInterface) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}update-product-oil`, data);
  }

  delete(data: ProductsOilInterface) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}delete-product-oil`, data);
  }

  updatePosition(data: ProductsOilInterface) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}update-product-oil-position`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updateCatalogPosition', data))
    // );
  }

  bulkActivate(data: ProductsOilInterface[]) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}bulk-activate-products-oil`, data);
  }

  bulkDeactivate(data: ProductsOilInterface[]) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}bulk-deactivate-products-oil`, data);
  }

  bulkDelete(data: ProductsOilInterface[]) {
    return this.http.post<ProductOil[]>(`${environment.serverURL}bulk-delete-products-oil`, data);
  }
}
