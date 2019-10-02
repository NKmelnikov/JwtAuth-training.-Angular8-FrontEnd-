import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  email = '';
  password = '';
  // tslint:disable-next-line:variable-name
  private _access_token = '';

  constructor(private http: HttpClient) {
  }

  register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const user = {email: this.email, password: this.password};
    this.http.post(environment.serverURL + 'register', user, httpOptions).subscribe((data) => console.log(data));
  }

  login() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const user = {email: this.email, password: this.password};
    this.http.post(
      environment.serverURL + 'login',
      user,
      httpOptions
    ).subscribe(
      (data: any) => this.access_token = data.access_token
    );
  }
}
