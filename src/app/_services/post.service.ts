import {
  Injectable,
  Injector
} from '@angular/core';
import {Observable} from 'rxjs';
import {NewsInterface} from '../admin/news/news.interface';
import {Service} from './service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostService extends Service {
  constructor(private injector: Injector) {
    super(injector);
  }

  getNewsItemBySlug(slug): Observable<NewsInterface> {
    return this.http.post<NewsInterface>(`${environment.serverURL}home/get-news-item-by-slug`, {slug});
  }

  getAll(): Observable<any[]> {
    return super.getAll('home/get-posts');
  }

  create(data: NewsInterface) {
    return super.create(data, 'create-post');
  }

  update(data: NewsInterface) {
    return super.create(data, 'update-post');
  }

  copy(data: NewsInterface) {
    return super.copy(data, 'copy-post');
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
