import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private token: TokenService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/login' && localStorage.getItem('token')) {
      if (this.router.url === '/') {
        this.router.navigate(['/categories']);
      }
      return false;

    } else if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return false;
    }


    return true;

  }



}
