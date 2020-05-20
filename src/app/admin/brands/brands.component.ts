import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {BrandService} from '../../_services';
import clonedeep from 'lodash.clonedeep';
import {BrandsDialogComponent} from './brands-dialog/brands-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import {BrandsInterface} from '../brands/brands.interface';
import {NewsInterface} from "../news/news.interface";


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(
    private brandService: BrandService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  public brands;
  public bulkAction;
  public preloadData = [{
    _id: {$oid: 'noData'}, createdAt: {$date: 111111111111111},
    position: 1, active: 0, brandImgPath: '/noData', brandName: 'noData',
  }];
  public dataSource;
  public displayedColumns: string[] = [
    'select', 'position', 'active', 'brandName', 'brandImgPath', 'createdAt', 'action'
  ];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<BrandsInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.brands = this.brandService.getAll()
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
    const dialogRef = this.dialog.open(BrandsDialogComponent, {
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
    this.brandService.createBrand(rowObj).subscribe(res => {
      console.log(res);
      this.refreshTable();
    });
  }

  updateBrand(rowObj) {
    this.brandService.updateBrand(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  deleteBrand(rowObj) {
    this.brandService.deleteBrand(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updateBrandPosition(dataSource) {
    this.brandService.updateBrandPosition(dataSource)
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
        this.brandService.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'deactivate':
        this.brandService.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'delete':
        this.brandService.bulkDelete(selectedRows).subscribe(res => {
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

  checkboxLabel(row?: NewsInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
