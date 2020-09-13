import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {BrandsInterface} from '../admin/brands/brands.interface';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class MetalworkingService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('home/get-metalworking');
  }

  create(data: BrandsInterface) {
    return super.create(data, 'create-metalworking');
  }

  update(data: BrandsInterface) {
    return super.create(data, 'update-metalworking');
  }

  delete(data: BrandsInterface) {
    return super.delete(data, 'delete-metalworking');
  }

  updatePosition(data: BrandsInterface) {
    return super.updatePosition(data, 'update-metalworking-position');
  }

  bulkActivate(data: BrandsInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-metalworking');
  }

  bulkDeactivate(data: BrandsInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-metalworking');
  }

  bulkDelete(data: BrandsInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-metalworking');
  }
}
