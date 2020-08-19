import {Component, OnInit} from '@angular/core';
import {AuthService, TokenService} from '../../_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private token: TokenService,
    private router: Router
  ) {
  }

  public user = {
    email: '',
    password: ''
  };

  ngOnInit() {
  }

  async register() {
    try {
      const response = await this.authService.register(this.user);
      await this.login();
    } catch (error) {
      console.log(error);
    }

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
