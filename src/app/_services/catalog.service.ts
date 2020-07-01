import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {CatalogsInterface} from '../admin/catalogs/catalogs.interface';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class CatalogService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('get-catalogs');
  }

  create(data: CatalogsInterface) {
    return super.create(data, 'create-catalog');
  }

  update(data: CatalogsInterface) {
    return super.create(data, 'update-catalog');
  }

  delete(data: CatalogsInterface) {
    return super.delete(data, 'delete-catalog');
  }

  updatePosition(data: CatalogsInterface) {
    return super.updatePosition(data, 'update-catalog-position');
  }

  bulkActivate(data: CatalogsInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-catalogs');
  }

  bulkDeactivate(data: CatalogsInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-catalogs');
  }

  bulkDelete(data: CatalogsInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-catalogs');
  }
}
