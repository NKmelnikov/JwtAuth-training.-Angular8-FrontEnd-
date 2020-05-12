import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {SelectionModel} from '@angular/cdk/collections';
import {NewsInterface} from './news.interface';
import {PostService} from '../../_services';
import {Observable, from} from 'rxjs';
import {Post} from '../../_models';
import {map} from 'rxjs/operators';
import clonedeep from 'lodash.clonedeep';
import {NewsDialogComponent} from './news-dialog/news-dialog.component';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


  constructor(
    private postService: PostService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  public news;
  public bulkAction;
  public preloadData = [{
    _id: {$oid: 'preload'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    postImgPath: '/preload',
    postTitle: 'preload',
    postShortText: 'preload',
    postArticle: 'preload'
  }];
  public dataSource;
  public displayedColumns: string[] = [
    'select', 'position', 'active', 'postImgPath', 'postTitle', 'postShortText', 'postArticle', 'createdAt', 'action'
  ];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<NewsInterface>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
    this.updatePostPosition(this.dataSource.data);
  }

  onBulkActionChange($event) {
    const selectedRows = this.selection.selected;
    switch ($event.value) {
      case 'activate':
        this.postService.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'deactivate':
        this.postService.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'delete':
        this.postService.bulkDelete(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
    }
  }

  openDialog(action, obj?) {
    obj = obj || {};
    obj.action = action;
    const dialogRef = this.dialog.open(NewsDialogComponent, {
      width: '800px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.createPost(result.data);
      } else if (result.event === 'Update') {
        this.updatePost(result.data);
      } else if (result.event === 'Delete') {
        this.deletePost(result.data);
      }
    });
  }

  createPost(rowObj) {
    this.postService.createPost(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updatePost(rowObj) {
    this.postService.updatePost(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  deletePost(rowObj) {
    this.postService.deletePost(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updatePostPosition(dataSource) {
    this.postService.updatePostPosition(dataSource)
      .subscribe(res => {
        this.refreshTable();
      });
  }

  refreshTable() {
    this.news = this.postService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.bulkAction = null;
        this.selection.clear();
        this.changeDetectorRefs.detectChanges();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource !== undefined) ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: NewsInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
