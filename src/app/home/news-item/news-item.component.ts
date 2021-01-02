import {
  Component,
  OnInit
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {PostService} from '../../_services';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  newsItem = {
    article: '',
    shortText: '',
    slug: '',
    title: '',
    imgPath: '',
  };
  env = environment;
  headerTitle = '';

  constructor(
    private newsService: PostService,
    private sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.getNewsItemBySlug();
  }

  getNewsItemBySlug() {
    const slug = document.location.pathname.split('/');
    const data = slug[slug.length - 1];
    this.newsService.getNewsItemBySlug(data)
      .subscribe(item => {
        // @ts-ignore
        this.newsItem = item;
        this.headerTitle = item.title;
        // @ts-ignore
        this.newsItem.article = this.getInnerHTMLArticle();
      });
  }

  getInnerHTMLArticle() {
    return this.sanitizer.bypassSecurityTrustHtml(this.newsItem.article);
  }
}
