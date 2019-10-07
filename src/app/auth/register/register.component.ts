import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) {
  }
  user = {
    email: '',
    password: ''
  };
  ngOnInit() {
  }

  register() {
    this.authService.register(this.user);
  }
}
