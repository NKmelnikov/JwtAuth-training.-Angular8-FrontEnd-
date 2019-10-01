import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  email = '';
  password = '';


  sayhi() {
    console.log(this.email, this.password);
  }

  ngOnInit() {
    this.http.get('http://127.0.0.1:5000/').subscribe((data) => console.log(data));
  }

}
