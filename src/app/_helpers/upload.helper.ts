import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UploadHelper {
  constructor(private http: HttpClient) {
  }

  uploadImgFromB64(data): Observable<any> {
    return this.http.post<any>(`${environment.serverURL}upload-img-from-b64`, data);
  }

  uploadPdf(data): Observable<any> {
    console.log(data);
    return this.http.post<any>(`${environment.serverURL}upload-pdf`, data);
  }
}
