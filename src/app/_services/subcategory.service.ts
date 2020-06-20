import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SubCategoriesInterface} from '../admin/categories/categories-edit/subcategories.interface';
import {SubCategory} from '../_models';

@Injectable({providedIn: 'root'})
export class SubCategoryService {
  constructor(private http: HttpClient) {
  }

  createSubCategory(data: SubCategoriesInterface) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}create-subcategory`, data);
  }

  updateSubCategory(data: SubCategoriesInterface) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}update-subcategory`, data);
  }

  deleteSubCategory(data: SubCategoriesInterface) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}delete-subcategory`, data);
  }

  updateSubCategoryPosition(data: SubCategoriesInterface) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}update-subcategory-position`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updateSubCategoryPosition', data))
    // );
  }

  bulkActivate(data: SubCategoriesInterface[]) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}bulk-activate-subcategories`, data);
  }

  bulkDeactivate(data: SubCategoriesInterface[]) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}bulk-deactivate-subcategories`, data);
  }

  bulkDelete(data: SubCategoriesInterface[]) {
    return this.http.post<SubCategory[]>(`${environment.serverURL}bulk-delete-subcategories`, data);
  }
}
