import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit() {
    console.log(this.authService.access_token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.http.get(environment.serverURL + 'home').subscribe((data) => console.log(data));
  }

}
