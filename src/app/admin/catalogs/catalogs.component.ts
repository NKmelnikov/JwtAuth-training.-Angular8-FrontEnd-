import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {CatalogService} from '../../_services';
import clonedeep from 'lodash.clonedeep';
import {CatalogsDialogComponent} from './catalogs-dialog/catalogs-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {CatalogsInterface} from '../catalogs/catalogs.interface';
import {BrandsInterface} from '../brands/brands.interface';
import {BrandsDialogComponent} from "../brands/brands-dialog/brands-dialog.component";

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  public catalogs;
  public bulkAction;
  public preloadData = [{
    _id: {$oid: 'noData'}, createdAt: {$date: 111111111111111},
    position: 1, active: 0, brandId: 'noData',
    catalogPdfPath: '/noData', catalogName: 'noData',
  }];
  public dataSource;
  public displayedColumns: string[] = [
    'select', 'position', 'active',
    'brandId', 'catalogName', 'catalogPdfPath',
    'createdAt', 'action'
  ];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<CatalogsInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

    refreshTable() {
    this.catalogs = this.catalogService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.bulkAction = null;
        this.selection.clear();
        this.changeDetectorRefs.detectChanges();
      });
  }

    openDialog(action, obj?) {
    obj = obj || {};
    obj.action = action;
    const dialogRef = this.dialog.open(CatalogsDialogComponent, {
      width: '800px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.createBrand(result.data);
      } else if (result.event === 'Update') {
        this.updateBrand(result.data);
      } else if (result.event === 'Delete') {
        this.deleteBrand(result.data);
      }
    });
  }

    createBrand(rowObj) {
    this.catalogService.createCatalog(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updateBrand(rowObj) {
    this.catalogService.updateCatalog(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  deleteBrand(rowObj) {
    this.catalogService.deleteCatalog(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updateBrandPosition(dataSource) {
    this.catalogService.updateCatalogPosition(dataSource)
      .subscribe(res => {
        this.refreshTable();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
    this.updateBrandPosition(this.dataSource.data);
  }

  onBulkActionChange($event) {
    const selectedRows = this.selection.selected;
    switch ($event.value) {
      case 'activate':
        this.catalogService.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'deactivate':
        this.catalogService.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'delete':
        this.catalogService.bulkDelete(selectedRows).subscribe(res => {
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

  checkboxLabel(row?: CatalogsInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
