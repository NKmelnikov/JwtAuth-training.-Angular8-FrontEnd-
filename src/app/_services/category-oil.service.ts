import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CategoriesOilInterface} from '../admin/categories-oil/categories-oil.interface';
import {CategoryOil} from '../_models';

@Injectable({providedIn: 'root'})
export class CategoryOilService {
  constructor(private http: HttpClient) {
  }


  getCategoriesOil(): Observable<CategoryOil[]> {
    return this.http.get<CategoryOil[]>(`${environment.serverURL}get-categories-oil`);
  }

  createCategoryOil(data: CategoriesOilInterface) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}create-category-oil`, data);
  }


  updateCategoryOil(data: CategoriesOilInterface) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}update-category-oil`, data);
  }

  deleteCategoryOil(data: CategoriesOilInterface) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}delete-category-oil`, data);
  }

  updateCategoryPositionOil(data: CategoriesOilInterface) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}update-category-position-oil`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updatecategoryPosition', data))
    // );
  }

  bulkActivate(data: CategoriesOilInterface[]) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}bulk-activate-categories-oil`, data);
  }

  bulkDeactivate(data: CategoriesOilInterface[]) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}bulk-deactivate-categories-oil`, data);
  }

  bulkDelete(data: CategoriesOilInterface[]) {
    return this.http.post<CategoryOil[]>(`${environment.serverURL}bulk-delete-categories-oil`, data);
  }
}
