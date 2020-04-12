import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../_services';
import {Router} from '@angular/router';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  active = false;
  private clients = 1;
  private yearsOrMarket = 1;
  private developers = 1;
  private countries = 1;
  private advCountTriggered = false;
  private proofsTriggered = false;
  private qualityTriggered = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {
  }


  ngAfterViewInit() {
    const advSection = document.querySelector('.adv-section_js');
    const proofsSection = document.querySelector('.proofs-section_js');
    const qualitySection = document.querySelector('.quality-section_js');
    window.addEventListener('scroll', (e) => {
      if (this.isInViewport(advSection) && !this.advCountTriggered) {
        this.startAdvantageCount();
      }
      if (this.isInViewport(proofsSection) && !this.proofsTriggered) {
        this.proofsAnimation();
      }
      if (this.isInViewport(qualitySection) && !this.qualityTriggered) {
        this.qualityAnimation();
      }
    });
  }

  ngOnInit() {
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

  advantageCounter(time, val, item) {
    interval(time)
      .pipe(take(val))
      .subscribe(x => this[item] = x);
  }

  startAdvantageCount() {
    this.advantageCounter(100, 25, 'clients');
    this.advantageCounter(100, 13, 'yearsOrMarket');
    this.advantageCounter(100, 9, 'developers');
    this.advantageCounter(100, 5, 'countries');
    this.advCountTriggered = true;
  }

  proofsAnimation() {
    const proofItems = document.querySelectorAll('.proof-item_js');
    interval(300)
      .pipe(take(proofItems.length))
      .subscribe(x => proofItems[x].className = proofItems[x].className + ' fadeInFromTop');
    this.proofsTriggered = true;
  }

  qualityAnimation() {
    const qualityLeft = document.querySelector('.quality-section-left_js');
    const qualityRight = document.querySelector('.quality-section-right_js');
    qualityLeft.className = qualityLeft.className + ' fadeInFromLeft';
    qualityRight.className = qualityRight.className + ' fadeInFromRight';
    this.qualityTriggered = true;
  }

  isInViewport(el) {
    const scroll = window.scrollY || window.pageYOffset;
    const boundsTop = el.getBoundingClientRect().top + scroll;
    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
    };

    const bounds = {
      top: boundsTop,
      bottom: boundsTop + el.clientHeight,
    };

    return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
      || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
  }
}
