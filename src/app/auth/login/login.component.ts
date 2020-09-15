import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services';
import {Router} from '@angular/router';
import {UserModel} from '../UserModel';
import {TokenService} from '../../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private token: TokenService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  async login() {
    try {
      const success = await this.authService.login(this.user);
      this.token.handle(success['access_token']);
      this.user.password = '***';
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      await this.router.navigate(['/admin']);
      console.log(success);
    } catch (error) {
      console.error(error);
      alert('Bad credentials.');
    }
  }
}
