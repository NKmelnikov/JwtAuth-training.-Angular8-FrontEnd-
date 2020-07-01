import {Injectable, Injector} from '@angular/core';
import {SubCategoriesInterface} from '../admin/categories/categories-edit/subcategories.interface';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class SubCategoryService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  create(data: SubCategoriesInterface) {
    return super.create(data, 'create-subcategory');
  }

  update(data: SubCategoriesInterface) {
    return super.create(data, 'update-subcategory');
  }

  delete(data: SubCategoriesInterface) {
    return super.delete(data, 'delete-subcategory');
  }

  updatePosition(data: SubCategoriesInterface) {
    return super.updatePosition(data, 'update-subcategory-position');
  }

  bulkActivate(data: SubCategoriesInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-subcategories');
  }

  bulkDeactivate(data: SubCategoriesInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-subcategories');
  }

  bulkDelete(data: SubCategoriesInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-subcategories');
  }
}
