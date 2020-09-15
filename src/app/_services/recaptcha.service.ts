import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NgRecaptcha3Service} from 'ng-recaptcha3';


@Injectable({providedIn: 'root'})
export class RecaptchaService {

  constructor(
    private http: HttpClient,
    private recaptcha3: NgRecaptcha3Service,
  ) {
  }

  getToken() {
    return this.recaptcha3.getToken();
  }

  checkValidity(token) {
    return this.http.post(`${environment.serverURL}check-recaptcha`, {token});
  }
}
