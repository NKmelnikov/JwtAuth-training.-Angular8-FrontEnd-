import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

    public env = environment;
    constructor(private http: HttpClient, private router: Router) {
    }

    register(user) {
        return this.http.post(`${this.env.serverURL}auth/register`, user).toPromise();
    }

    login(user): any {
        return this.http.post(`${this.env.serverURL}auth/login`, user).toPromise();
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    buildURL(path) {
        return this.env + path;
    }
}
