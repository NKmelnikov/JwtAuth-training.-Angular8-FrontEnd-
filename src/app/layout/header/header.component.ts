import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Router} from '@angular/router';
import {
  TRANSLOCO_SCOPE,
  TranslocoService
} from '@ngneat/transloco';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'layout'
    }
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private translocoService: TranslocoService
  ) {
  }

  // active = false;
  @Input() active: boolean;
  @Output() activeEvent = new EventEmitter<boolean>();

  ngOnInit() {
  }

  toggleActive() {
    this.activeEvent.emit(this.active = !this.active);
  }

  redirectTo(uri){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  changeActiveLanguage(lang) {
    this.translocoService.setActiveLang(lang);
  }

}
