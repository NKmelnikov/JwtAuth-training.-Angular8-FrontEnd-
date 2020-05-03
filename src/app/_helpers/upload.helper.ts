import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UploadHelper {
  constructor(private http: HttpClient) {
  }

  uploadFile(b64): Observable<any> {
    return this.http.post<any>(`${environment.serverURL}upload-file`, {b64});
  }
}
