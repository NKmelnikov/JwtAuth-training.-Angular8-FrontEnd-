import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  active = false;

  ngOnInit() {
    this.http.get(environment.serverURL + 'home').subscribe((data) => console.log(data));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  receiveActiveHeader($event) {
    this.active = $event;
  }

  receiveActiveSideBar($event) {
    this.active = $event;
  }
}
