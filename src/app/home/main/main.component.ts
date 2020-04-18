import {AfterViewInit, Component} from '@angular/core';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  private clients = 1;
  private yearsOrMarket = 1;
  private developers = 1;
  private countries = 1;
  private advCountTriggered = false;
  private proofsTriggered = false;
  private qualityTriggered = false;

  constructor() {
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    const advSection = document.querySelector('.adv-section_js');
    const proofsSection = document.querySelector('.proofs-section_js');
    const qualitySection = document.querySelector('.quality-section_js');
    if (this.isInViewport(advSection) && !this.advCountTriggered) {
      this.startAdvantageCount();
    }
    if (this.isInViewport(proofsSection) && !this.proofsTriggered) {
      this.proofsAnimation();
    }
    if (this.isInViewport(qualitySection) && !this.qualityTriggered) {
      this.qualityAnimation();
    }
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
