import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  @Input() active: boolean;
  @Output() activeEvent2 = new EventEmitter<boolean>();

  ngOnInit() {
  }

  toggleActive() {
    this.activeEvent2.emit(this.active = !this.active);
  }
}
