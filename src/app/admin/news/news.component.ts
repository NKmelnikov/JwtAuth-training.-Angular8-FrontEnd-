import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {SelectionModel} from '@angular/cdk/collections';
import {NewsInterface} from './news.interface';
import {PostService} from '../../_services';
import {Observable, from} from 'rxjs';
import {Post} from '../../_models';
import {map} from 'rxjs/operators';
import clonedeep from 'lodash.clonedeep';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {


  constructor(
    private postService: PostService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }

  public news;
  public preloadData = [{_id: {$oid: 'preload'},
                          createdAt: {$date: 1588186193417},
                          position: 1,
                          active: 0,
                          postImgPath: '/preload',
                          postTitle: 'preload',
                          postShortText: 'preload',
                          postArticle: 'preload'}];
  public dataSource;
  public displayedColumns: string[] = [
    'select', 'position', 'active', 'postImgPath', 'postTitle', 'postShortText', 'postArticle', 'createdAt'
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
    this.postService.updatePostPosition(this.dataSource.data)
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
        this.changeDetectorRefs.detectChanges();
        console.log(data);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = (this.dataSource !== undefined) ? this.dataSource.data.length : 0;
    if (numSelected > numRows) {
      return true;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: NewsInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
