import {Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {NewsInterface} from './news.interface';
import {NewsDialogComponent} from './news-dialog/news-dialog.component';
import {AdminBaseComponent} from '../admin.base-component';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent extends AdminBaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  public news;
  public serverUrl;
  public env = environment;

  public preloadData = [{
    _id: {$oid: 'preload'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    imgPath: '/preload',
    title: 'preload',
    slug: 'preload',
    shortText: 'preload',
    article: 'preload'
  }];

  public displayedColumns: string[] = [
    'select',
    'imgPath',
    'position',
    'active',
    'title',
    'slug',
    'shortText',
    'article',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<NewsInterface>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.news = this.postService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.refreshTableRoutine();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.postService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.postService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.postService, NewsDialogComponent);
  }
}
