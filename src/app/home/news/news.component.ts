import { Component, OnInit } from '@angular/core';
import {PostService} from '../../_services';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsHomeComponent implements OnInit {

  newsList;
  page = 1;
  pageSize = 6;
  public env = environment;


  constructor(
    private newsService: PostService
  ) { }

  ngOnInit(): void {

    this.newsService.getAll()
      .subscribe(data => {
        this.newsList = data;
        console.log(this.newsList);
      });
  }

}
