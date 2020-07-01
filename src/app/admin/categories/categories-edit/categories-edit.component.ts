import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';
import {SubcategoryDialogComponent} from './subcategory-dialog/subcategory-dialog.component';
import {AdminBaseComponent} from '../../admin.base-component';
import {CategoriesInterface} from '../categories.interface';
import {SubCategoriesInterface} from './subcategories.interface';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends AdminBaseComponent implements OnInit {

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

  public category: CategoriesInterface = {
    // @ts-ignore
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
    sub_id: {$oid: 'noData'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    subCategoryName: '/noData',
    subCategoryDescription: 'noData',
    subCategories: []
  }];

  public displayedColumns: string[] = [
    'select',
    'position',
    'active',
    'subCategoryName',
    'subCategoryDescription',
    'createdAt',
    'action'
  ];

  constructor(private injector: Injector) {
    super(injector);
  }

  @ViewChild('table', {static: true}) table: MatTable<SubCategoriesInterface>;

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
    categoryId = (typeof categoryId === 'string') ? {id: this.categoryId.id} :  categoryId ;
    // @ts-ignore
    this.categoryService.getCategoryById(categoryId)
      .subscribe(data => {
        // @ts-ignore
        this.category = data;
        this.refreshTableRoutine();
        // @ts-ignore
        this.dataSource = new MatTableDataSource(data.subCategories);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.dataSource.data.push(this.categoryId.id);
    super.drop(event, this.subcategoryService, this.categoryId.id);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.subcategoryService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.subcategoryService, SubcategoryDialogComponent, this.categoryId.id);
  }

  back() {
    this.location.back();
  }

  createOrEditCategory() {
    if (!this.editFlag) {
      this.categoryService.create(this.category)
        .subscribe(data => console.log(data));
      this.router.navigate(['/admin/categories/']);
      return 0;
    }

    this.categoryService.update(this.category)
      .subscribe(data => console.log(data));
    this.router.navigate(['/admin/categories/']);
  }
}
