import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


import {Post} from '../_models';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.serverURL}getPosts`);
  }

  createPost() {

  }
}
