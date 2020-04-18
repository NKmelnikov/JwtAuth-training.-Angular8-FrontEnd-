import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../_services';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  active = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  receiveActiveHeader($event) {
    this.active = $event;
  }

  receiveActiveSideBar($event) {
    this.active = $event;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
