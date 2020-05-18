import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NewsInterface} from '../admin/news/news.interface';
import {Post} from '../_models';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.serverURL}get-posts`);
  }

  createPost(data: NewsInterface) {
    return this.http.post<Post[]>(`${environment.serverURL}create-post`, data);
  }


  updatePost(data: NewsInterface) {
    return this.http.post<Post[]>(`${environment.serverURL}update-post`, data);
  }

  deletePost(data: NewsInterface) {
    return this.http.post<Post[]>(`${environment.serverURL}delete-post`, data);
  }

  updatePostPosition(data: NewsInterface) {
    return this.http.post<Post[]>(`${environment.serverURL}update-post-position`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updatePostPosition', data))
    // );
  }

  bulkActivate(data: NewsInterface[]) {
    return this.http.post<Post[]>(`${environment.serverURL}bulk-activate-posts`, data);
  }

  bulkDeactivate(data: NewsInterface[]) {
    return this.http.post<Post[]>(`${environment.serverURL}bulk-deactivate-posts`, data);
  }

  bulkDelete(data: NewsInterface[]) {
    return this.http.post<Post[]>(`${environment.serverURL}bulk-delete-posts`, data);
  }
}
