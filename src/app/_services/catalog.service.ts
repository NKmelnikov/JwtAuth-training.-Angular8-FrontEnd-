import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ErrorHandler} from '../_helpers/error.handler';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CatalogsInterface} from '../admin/catalogs/catalogs.interface';

export class Catalog {
  _id: object;
  active: number;
  position: number;
  brandId: string;
  catalogPdfPath: string;
  catalogName: string;
  createdAt: object;
}

@Injectable({providedIn: 'root'})
export class CatalogService {
  constructor(private http: HttpClient) {
  }


  getAll(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${environment.serverURL}get-catalogs`);
  }

  createCatalog(data: CatalogsInterface) {
    return this.http.post<Catalog[]>(`${environment.serverURL}create-catalog`, data);
  }


  updateCatalog(data: CatalogsInterface) {
    return this.http.post<Catalog[]>(`${environment.serverURL}update-catalog`, data);
  }

  deleteCatalog(data: CatalogsInterface) {
    return this.http.post<Catalog[]>(`${environment.serverURL}delete-catalog`, data);
  }

  updateCatalogPosition(data: CatalogsInterface) {
    return this.http.post<Catalog[]>(`${environment.serverURL}update-catalog-position`, data);
    // .pipe(
    //   catchError(ErrorHandler.handleError('updateCatalogPosition', data))
    // );
  }

  bulkActivate(data: CatalogsInterface[]) {
    return this.http.post<Catalog[]>(`${environment.serverURL}bulk-activate-catalogs`, data);
  }

  bulkDeactivate(data: CatalogsInterface[]) {
    return this.http.post<Catalog[]>(`${environment.serverURL}bulk-deactivate-catalogs`, data);
  }

  bulkDelete(data: CatalogsInterface[]) {
    return this.http.post<Catalog[]>(`${environment.serverURL}bulk-delete-catalogs`, data);
  }
}
