import {ChangeDetectorRef, HostListener, Injector, ViewChild} from '@angular/core';
import {BrandService, PostService} from '../_services';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {NewsInterface} from './news/news.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import clonedeep from 'lodash.clonedeep';


export abstract class AdminBaseComponent {
  protected dataSource;
  protected bulkAction;
  protected selection = new SelectionModel(true, []);
  protected postService: PostService;
  protected brandService: BrandService;
  protected dialog: MatDialog;
  protected changeDetectorRefs: ChangeDetectorRef;

  protected constructor(private injectorObj: Injector) {
    this.postService = this.injectorObj.get(PostService);
    this.brandService = this.injectorObj.get(BrandService);
    this.changeDetectorRefs = this.injectorObj.get(ChangeDetectorRef);
    this.dialog = this.injectorObj.get(MatDialog);
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  abstract refreshTable();

  refreshTableRoutine(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.bulkAction = null;
    this.selection.clear();
    this.changeDetectorRefs.detectChanges();
  }

  drop(event: CdkDragDrop<string[]>, service) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
    this.updatePosition(this.dataSource.data, service);
  }

  onBulkActionChange($event, service) {
    const selectedRows = this.selection.selected;
    switch ($event.value) {
      case 'activate':
        service.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'deactivate':
        service.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'delete':
        service.bulkDelete(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
    }
  }

  openDialog(action, obj, service, dialogComponent) {
    obj = obj || {};
    obj.action = action;
    const dialogRef = this.dialog.open(dialogComponent, {
      width: '800px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.create(result.data, service);
      } else if (result.event === 'Update') {
        this.update(result.data, service);
      } else if (result.event === 'Delete') {
        this.delete(result.data, service);
      }
    });
  }

  create(rowObj, service) {
    service.create(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  update(dataSource, service) {
    service.update(dataSource).subscribe(res => {
      this.refreshTable();
    });
  }

  delete(dataSource, service) {
    service.delete(dataSource).subscribe(res => {
      this.refreshTable();
    });
  }

  updatePosition(dataSource, service) {
    service.updatePosition(dataSource).subscribe(res => {
      this.refreshTable();
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
