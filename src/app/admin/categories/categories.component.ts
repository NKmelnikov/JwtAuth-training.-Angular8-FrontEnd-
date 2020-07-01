import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {CategoriesInterface} from './categories.interface';
import {AdminBaseComponent} from '../admin.base-component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends AdminBaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  public categories;
  public brandList;

  public preloadData = [{
    _id: {$oid: 'noData'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    categoryType: 1,
    categoryName: '/noData',
    categoryDescription: 'noData',
  }];

  public displayedColumns: string[] = [
    'select',
    'position',
    'active',
    'categoryType',
    'categoryName',
    'categoryDescription',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<CategoriesInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.categories = this.categoryService.getAll()
      .subscribe(data => {
        this.refreshTableRoutine();
        this.dataSource = new MatTableDataSource(data);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.categoryService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.categoryService);
  }
}
