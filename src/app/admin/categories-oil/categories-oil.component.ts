import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {CategoriesOilInterface} from './categories-oil.interface';
import {BrandService, CategoryOilService} from '../../_services';
import {SelectionModel} from '@angular/cdk/collections';
import clonedeep from 'lodash.clonedeep';

@Component({
  selector: 'app-categories-oil',
  templateUrl: './categories-oil.component.html',
  styleUrls: ['./categories-oil.component.scss']
})
export class CategoriesOilComponent implements OnInit {

  constructor(
    private categoryOilService: CategoryOilService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {
  }

  public categoriesOil;
  public brandList;
  public bulkAction;
  public preloadData = [{
    _id: {$oid: 'noData'}, createdAt: {$date: 111111111111111},
    position: 1, active: 0, categoryName: '/noData', categoryDescription: 'noData',
  }];
  public dataSource;
  public displayedColumns: string[] = [
    'select', 'position', 'active',
    'categoryName', 'categoryDescription',
    'createdAt', 'action'
  ];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<CategoriesOilInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.categoriesOil = this.categoryOilService.getCategoriesOil()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.bulkAction = null;
        this.selection.clear();
        this.changeDetectorRefs.detectChanges();
        console.log(this.dataSource.data);
      });
  }

  // openDialog(action, obj?) {
  //   obj = obj || {};
  //   obj.action = action;
  //
  //   const dialogRef = this.dialog.open(CategorysDialogComponent, {
  //     width: '800px',
  //     data: obj,
  //     panelClass: 'formFieldWidth752'
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.event === 'Create') {
  //       this.createCategory(result.data);
  //     } else if (result.event === 'Update') {
  //       this.updateCategory(result.data);
  //     } else if (result.event === 'Delete') {
  //       this.deleteCategory(result.data);
  //     }
  //   });
  // }
  //
  // createCategory(rowObj) {
  //   this.categoryOilService.createCategoryOil(rowObj).subscribe(res => {
  //     this.refreshTable();
  //   });
  // }
  //
  // updateCategory(rowObj) {
  //   this.categoryOilService.updateCategoryOil(rowObj).subscribe(res => {
  //     this.refreshTable();
  //   });
  // }
  //
  deleteCategory(rowObj) {
    this.categoryOilService.deleteCategoryOil(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updateCategoryPosition(dataSource) {
    this.categoryOilService.updateCategoryPositionOil(dataSource)
      .subscribe(res => {
        this.refreshTable();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
    this.updateCategoryPosition(this.dataSource.data);
  }

  onBulkActionChange($event) {
    const selectedRows = this.selection.selected;
    switch ($event.value) {
      case 'activate':
        this.categoryOilService.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'deactivate':
        this.categoryOilService.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'delete':
        this.categoryOilService.bulkDelete(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
    }
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

  checkboxLabel(row?: CategoriesOilInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
