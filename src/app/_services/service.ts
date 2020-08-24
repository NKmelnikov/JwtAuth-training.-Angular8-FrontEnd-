import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export abstract class Service {
  protected http: HttpClient;
  protected constructor(private injectorObj: Injector) {
      this.http = this.injectorObj.get(HttpClient);
  }


  getAll(path): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serverURL}${path}`);
  }

  create(data: any, path) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, data);
  }


  update(data: any, path: string) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, data);
  }

  delete(data: any, path: string) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, data);
  }

  updatePosition(data: any, path: string) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, {data});
  }

  bulkActivate(data: any, path: string) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, {data});
  }

  bulkDeactivate(data: any, path: string) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, {data});
  }

  bulkDelete(data: any, path: string) {
    return this.http.post<any[]>(`${environment.serverURL}${path}`, {data});
  }
}
