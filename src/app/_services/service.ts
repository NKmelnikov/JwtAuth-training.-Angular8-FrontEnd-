import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export abstract class Service {

  durationInSeconds = 5;
  protected http: HttpClient;
  protected snackBar: MatSnackBar;

  protected constructor(
    private injectorObj: Injector,
  ) {
    this.http = this.injectorObj.get(HttpClient);
    this.snackBar = this.injectorObj.get(MatSnackBar);
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

  copy(data: any, path: string) {
    console.log(this.snackBar);
    return this.http.post<any[]>(`${environment.serverURL}${path}`, data)
      .pipe(
        catchError(this.handleError.bind(this))
      );
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

  handleError(error: HttpErrorResponse) {
    for (let i in error.error.validationErrors) {
      this.snackBar.open(`Error. ${error.error.validationErrors[i][0]}`, null, {duration: this.durationInSeconds * 1000});
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
