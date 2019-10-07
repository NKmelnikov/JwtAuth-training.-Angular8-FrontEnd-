import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services';
import {Router, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  user = {
    email: '',
    password: ''
  };
  returnUrl: string;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    this.authService.login(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        });
  }
}
