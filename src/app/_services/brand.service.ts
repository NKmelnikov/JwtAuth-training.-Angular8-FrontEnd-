import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {BrandsInterface} from '../admin/brands/brands.interface';
import {Service} from './service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class BrandService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('get-brands');
  }

  getBrandBySlug(slug) {
    return this.http.post<any[]>(`${environment.serverURL}get-brand-by-slug`, slug);
  }

  create(data: BrandsInterface) {
    return super.create(data, 'create-brand');
  }

  update(data: BrandsInterface) {
    return super.create(data, 'update-brand');
  }

  delete(data: BrandsInterface) {
    return super.delete(data, 'delete-brand');
  }

  updatePosition(data: BrandsInterface) {
    return super.updatePosition(data, 'update-brand-position');
  }

  bulkActivate(data: BrandsInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-brands');
  }

  bulkDeactivate(data: BrandsInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-brands');
  }

  bulkDelete(data: BrandsInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-brands');
  }
}
