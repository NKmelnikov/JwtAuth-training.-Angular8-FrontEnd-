import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  active = false;

  receiveActiveHeader($event) {
    this.active = $event;
  }

  receiveActiveSideBar($event) {
    this.active = $event;
  }
}
