import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  // active = false;
  @Input() active: boolean;
  @Output() activeEvent = new EventEmitter<boolean>();

  ngOnInit() {
  }

  toggleActive() {
    this.activeEvent.emit(this.active = !this.active);
  }

  refreshProductPage() {
    this.router.navigate(['/products'])
      .then(() => {
        window.location.reload();
      });
  }
}
