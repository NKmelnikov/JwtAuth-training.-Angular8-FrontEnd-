import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoriesInterface} from '../admin/categories/categories.interface';
import {environment} from '../../environments/environment';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class CategoryService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('get-categories');
  }

  getCategoryById(categoryId) {
    return this.http.post<any[]>(`${environment.serverURL}get-category-by-id`, categoryId);
  }

  create(data: any) {
    return super.create(data, 'create-category');
  }

  update(data: any) {
    return super.create(data, 'update-category');
  }

  delete(data: CategoriesInterface) {
    return super.delete(data, 'delete-category');
  }

  updatePosition(data: CategoriesInterface) {
    return super.updatePosition(data, 'update-category-position');
  }

  bulkActivate(data: CategoriesInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-categories');
  }

  bulkDeactivate(data: CategoriesInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-categories');
  }

  bulkDelete(data: CategoriesInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-categories');
  }
}
