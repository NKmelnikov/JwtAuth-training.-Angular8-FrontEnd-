import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  // active = false;
  @Input() active: boolean;
  @Output() activeEvent = new EventEmitter<boolean>();

  ngOnInit() {
  }

  toggleActive() {
    this.activeEvent.emit(this.active = !this.active);
    console.log(this.active);
  }
}
