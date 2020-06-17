import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CategoriesInterface} from '../admin/categories/categories.interface';
import {Category} from '../_models';

@Injectable({providedIn: 'root'})
export class CategoryService {
  constructor(private http: HttpClient) {
  }


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.serverURL}get-categories`);
  }

  getCategoryById(categoryId): Observable<Category[]> {
    return this.http.post<Category[]>(`${environment.serverURL}get-categories-by-id`, categoryId);
  }

  createCategory(data: CategoriesInterface) {
    return this.http.post<Category[]>(`${environment.serverURL}create-category`, data);
  }


  updateCategory(data: CategoriesInterface) {
    return this.http.post<Category[]>(`${environment.serverURL}update-category`, data);
  }

  deleteCategory(data: CategoriesInterface) {
    return this.http.post<Category[]>(`${environment.serverURL}delete-category`, data);
  }

  updateCategoryPosition(data: CategoriesInterface) {
    return this.http.post<Category[]>(`${environment.serverURL}update-category-position`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updatecategoryPosition', data))
    // );
  }

  bulkActivate(data: CategoriesInterface[]) {
    return this.http.post<Category[]>(`${environment.serverURL}bulk-activate-categories`, data);
  }

  bulkDeactivate(data: CategoriesInterface[]) {
    return this.http.post<Category[]>(`${environment.serverURL}bulk-deactivate-categories`, data);
  }

  bulkDelete(data: CategoriesInterface[]) {
    return this.http.post<Category[]>(`${environment.serverURL}bulk-delete-categories`, data);
  }
}
