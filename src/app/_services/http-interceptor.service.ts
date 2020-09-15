import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {
  apiRequest: HttpRequest<any>;

  constructor(
    private injector: Injector,
    private router: Router,
    private tokenService: TokenService,
  ) {
  }

  intercept(request, next) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.tokenService.get() && currentUser) {
      this.apiRequest = request.clone({setHeaders: {Authorization: this.tokenService.get()}});
      return next.handle(this.apiRequest);
    } else {
      return next.handle(request);
    }
  }
}
