import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  isHeaderButtonIdArray = ['o-s0', 'o-s1', 'o-s2', 'o-s3', 'o-s4', 'o-s5', 'o-s6', 'o-s7', 'o-s8', 'o-s9'];

  @Input() active: boolean;
  @Output() activeEvent2 = new EventEmitter<boolean>();
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedOutside = !this.elementRef.nativeElement.contains(targetElement);
    const isHeaderButtonClicked = (this.isHeaderButtonIdArray.includes(targetElement.id));

    if (clickedOutside && !isHeaderButtonClicked) {
      this.activeEvent2.emit(false);
    }
  }

  ngOnInit() {
  }

  toggleActive() {
    this.activeEvent2.emit(this.active = !this.active);
  }
}
