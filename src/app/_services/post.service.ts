import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {NewsInterface} from '../admin/news/news.interface';
import {Service} from './service';

@Injectable({providedIn: 'root'})
export class PostService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getAll(): Observable<any[]> {
    return super.getAll('get-posts');
  }

  create(data: NewsInterface) {
    return super.create(data, 'create-post');
  }

  update(data: NewsInterface) {
    return super.create(data, 'update-post');
  }

  delete(data: NewsInterface) {
    return super.delete(data, 'delete-post');
  }

  updatePosition(data: NewsInterface) {
    return super.updatePosition(data, 'update-post-position');
  }

  bulkActivate(data: NewsInterface[]) {
    return super.bulkActivate(data, 'bulk-activate-posts');
  }

  bulkDeactivate(data: NewsInterface[]) {
    return super.bulkDeactivate(data, 'bulk-deactivate-posts');
  }

  bulkDelete(data: NewsInterface[]) {
    return super.bulkDelete(data, 'bulk-delete-posts');
  }
}
