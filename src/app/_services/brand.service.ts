import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BrandsInterface} from '../admin/brands/brands.interface';
import {Brand} from '../_models';

@Injectable({providedIn: 'root'})
export class BrandService {
  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${environment.serverURL}get-brands`);
  }

  createBrand(data: BrandsInterface) {
    return this.http.post<Brand[]>(`${environment.serverURL}create-brand`, data);
  }


  updateBrand(data: BrandsInterface) {
    return this.http.post<Brand[]>(`${environment.serverURL}update-brand`, data);
  }

  deleteBrand(data: BrandsInterface) {
    return this.http.post<Brand[]>(`${environment.serverURL}delete-brand`, data);
  }

  updateBrandPosition(data: BrandsInterface) {
    return this.http.post<Brand[]>(`${environment.serverURL}update-brand-position`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updateBrandPosition', data))
    // );
  }

  bulkActivate(data: BrandsInterface[]) {
    return this.http.post<Brand[]>(`${environment.serverURL}bulk-activate-brands`, data);
  }

  bulkDeactivate(data: BrandsInterface[]) {
    return this.http.post<Brand[]>(`${environment.serverURL}bulk-deactivate-brands`, data);
  }

  bulkDelete(data: BrandsInterface[]) {
    return this.http.post<Brand[]>(`${environment.serverURL}bulk-delete-brands`, data);
  }
}
