import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UploadHelper} from '../../../_helpers';
import {CategoryService} from '../../../_services';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {CategoriesInterface} from '../categories.interface';
import {Location} from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';
import {SelectionModel} from '@angular/cdk/collections';
import clonedeep from 'lodash.clonedeep';
import {SubcategoryDialogComponent} from './subcategory-dialog/subcategory-dialog.component';


@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  public active;
  // @ts-ignore
  public category: CategoriesInterface = {
    _id: {},
    createdAt: {},
    position: 0,
    active: 1,
    categoryType: 1,
    categoryName: '',
    categoryDescription: '',
    subCategories: []
  };
  public categoryName;
  public categoryDescription;
  public ckEditorConfig;
  public brand;
  public categoryId?;
  public editFlag = false;
  public Editor = ClassicEditor;
  public categories;
  public bulkAction;
  public preloadData = [{
    _id: {$oid: 'noData'}, createdAt: {$date: 111111111111111},
    position: 1, active: 0,
    subCategoryName: '/noData', subCategoryDescription: 'noData',
  }];
  public dataSource;
  public displayedColumns: string[] = [
    'select', 'position', 'active',
    'subCategoryName', 'subCategoryDescription',
    'createdAt', 'action'
  ];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<CategoriesInterface>;


  constructor(
    public uploadHelper: UploadHelper,
    public categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.categoryDescription = this.categoryDescription || '';
    this.route.params.subscribe((params: any) => {
      this.editFlag = false;
      if (!_.isEmpty(params)) {
        this.editFlag = true;
        this.getCategoryById(params);
      }
    });
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.categories = this.categoryService.getCategories()
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

  openDialog(action, obj?) {
    obj = obj || {};
    obj.action = action;

    const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
      width: '800px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.createSubCategory(result.data);
      } else if (result.event === 'Update') {
        this.updateSubCategory(result.data);
      } else if (result.event === 'Delete') {
        this.deleteSubCategory(result.data);
      }
    });
  }

  createSubCategory(rowObj) {
    this.categoryService.createCategory(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updateSubCategory(rowObj) {
    this.categoryService.updateCategory(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  deleteSubCategory(rowObj) {
    this.categoryService.deleteCategory(rowObj).subscribe(res => {
      this.refreshTable();
    });
  }

  updateSubCategoryPosition(dataSource) {
    this.categoryService.updateCategoryPosition(dataSource)
      .subscribe(res => {
        this.refreshTable();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
    this.updateSubCategoryPosition(this.dataSource.data);
  }

  onBulkActionChange($event) {
    const selectedRows = this.selection.selected;
    switch ($event.value) {
      case 'activate':
        this.categoryService.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'deactivate':
        this.categoryService.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable();
        });
        break;
      case 'delete':
        this.categoryService.bulkDelete(selectedRows).subscribe(res => {
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

  checkboxLabel(row?: CategoriesInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getCategoryById(params) {
    this.categoryService.getCategoryById(params).subscribe(data => {
      // @ts-ignore
      this.category = data;
    });
  }

  back() {
    this.location.back();
  }

  createOrEditCategory() {
    if (!this.editFlag) {
      this.categoryService.createCategory(this.category)
        .subscribe(data => console.log(data));
      this.router.navigate(['/admin/categories/']);
      return 0;
    }

    this.categoryService.updateCategory(this.category)
      .subscribe(data => console.log(data));
    this.router.navigate(['/admin/categories/']);
  }
}
