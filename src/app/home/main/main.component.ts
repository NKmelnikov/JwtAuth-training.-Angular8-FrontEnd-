import {AfterViewInit, Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService, PostService, BrandService} from '../../_services';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit, OnInit {

  public clients = 1;
  public yearsOrMarket = 1;
  public developers = 1;
  public countries = 1;
  public advCountTriggered = false;
  public proofsTriggered = false;
  public qualityTriggered = false;
  public news = [];
  public brands = [];
  public carouselNewsOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  public carouselBrandsOptions = {
    loop: true,
    center: true,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    dots: false,
    navSpeed: 700,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      740: {
        items: 2
      },
      1360: {
        items: 7
      }
    },
    nav: true
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
    private brandService: BrandService,
  ) {
  }

  ngOnInit() {
    this.getNews();
    this.getBrands();
    const video1 = document.getElementById('video-drill');
    const video2 = document.getElementById('video-oil');
    const advSection = document.querySelector('.adv-section_js');

    video1.oncanplaythrough = () => {
      // @ts-ignore
      video1.muted = true;
      // @ts-ignore
      video1.play();
    };
    video2.oncanplaythrough = () => {
      // @ts-ignore
      video2.muted = true;
      // @ts-ignore
      video2.play();
    };

    if (this.isInViewport(advSection) && !this.advCountTriggered) {
      this.startAdvantageCount();
    }
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  getBrands() {
    this.brandService.getAll()
      .pipe(
        map(brands => brands.map(brand => ({
          ...brand,
          imgPath: `${environment.serverURL}${brand.imgPath}`
        }))),
        map(brands => brands.filter(brand => (brand.active > 0)))
      )
      .subscribe(data => {
        this.brands = data;
      });
  }

  getNews() {
    this.postService.getAll()
      .pipe(
        map(posts => posts.map(post => ({
          ...post,
          imgPath: `${environment.serverURL}${post.imgPath}`
        }))),
        map(posts => posts.filter(post => (post.active > 0)))
      )
      .subscribe(data => {
        this.news = data;
      });
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
    this.advantageCounter(50, 111, 'clients');
    this.advantageCounter(100, 6, 'yearsOrMarket');
    this.advantageCounter(100, 12, 'developers');
    this.advantageCounter(100, 7, 'countries');
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  playVideo(elementId) {
    // @ts-ignore
    const video = document.getElementById(elementId) as HTMLVideoElement;
    video.play();
  }

  pauseVideo(elementId) {
    // @ts-ignore

    // const video = document.getElementById(elementId) as HTMLVideoElement;
    // video.pause();
  }
}
