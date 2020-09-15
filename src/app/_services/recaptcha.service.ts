import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class RecaptchaService {

  public env = environment;

  constructor(private http: HttpClient) {
  }

  // checkValidity() {
  //   return this.http.get(`https://www.google.com/recaptcha/api/siteverify?secret=${this.env.recaptchaSecretKey}&response=${recaptchaToken}&remoteip=${userIp}`);
  // }
}
