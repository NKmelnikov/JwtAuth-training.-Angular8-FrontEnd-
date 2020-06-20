import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UploadHelper} from '../../../_helpers';
import {CategoryService, SubCategoryService} from '../../../_services';
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

  public categoryById;
  public active;
  public categoryName;
  public categoryDescription;
  public ckEditorConfig;
  public brand;
  public categoryId;
  public editFlag = false;
  public Editor = ClassicEditor;
  public categories;
  public bulkAction;

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

  public preloadData = [{
    sub_id: {$oid: 'noData'}, createdAt: {$date: 111111111111111},
    position: 1, active: 0, subCategoryName: '/noData',
    subCategoryDescription: 'noData', subCategories: []
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
    public subcategoryService: SubCategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
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
        this.categoryId = params;
        this.refreshTable(this.categoryId);
      }
    });
  }

  refreshTable(categoryId) {
    this.categoryService.getCategoryById(categoryId).subscribe(data => {
      // @ts-ignore
      this.category = data;
      // @ts-ignore
      this.dataSource = new MatTableDataSource(data.subCategories);
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

    const dialogRef = this.dialog.open(SubcategoryDialogComponent, {
      width: '800px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });

    dialogRef.afterClosed().subscribe(result => {
      result.data.id = this.categoryId.id;
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
    this.subcategoryService.createSubCategory(rowObj).subscribe(res => {
      this.refreshTable(this.categoryId);
    });
  }

  updateSubCategory(rowObj) {
    this.subcategoryService.updateSubCategory(rowObj).subscribe(res => {
      this.refreshTable(this.categoryId);
    });
  }

  deleteSubCategory(rowObj) {
    this.subcategoryService.deleteSubCategory(rowObj).subscribe(res => {
      this.refreshTable(this.categoryId);
    });
  }

  updateSubCategoryPosition(dataSource) {
    this.subcategoryService.updateSubCategoryPosition(dataSource)
      .subscribe(res => {
        this.refreshTable(this.categoryId);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
    const data = {id: this.categoryId.id, subCategories : this.dataSource.data};
    this.updateSubCategoryPosition(data);
  }

  onBulkActionChange($event) {
    const selectedRows = this.selection.selected;
    selectedRows.push(this.categoryId.id);
    switch ($event.value) {
      case 'activate':
        this.subcategoryService.bulkActivate(selectedRows).subscribe(res => {
          this.refreshTable(this.categoryId);
        });
        break;
      case 'deactivate':
        this.subcategoryService.bulkDeactivate(selectedRows).subscribe(res => {
          this.refreshTable(this.categoryId);
        });
        break;
      case 'delete':
        this.subcategoryService.bulkDelete(selectedRows).subscribe(res => {
          this.refreshTable(this.categoryId);
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
