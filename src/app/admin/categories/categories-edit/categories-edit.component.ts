import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {MatTableDataSource, MatSort, MatPaginator, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {CategoriesInterface} from '../categories.interface';
import * as ClassicEditor from '../../../_helpers/ckeditor';
import * as _ from 'lodash';
import {SelectionModel} from '@angular/cdk/collections';
import {SubcategoryDialogComponent} from './subcategory-dialog/subcategory-dialog.component';
import {AdminBaseComponent} from '../../admin.base-component';


@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent extends AdminBaseComponent implements OnInit {

  public active;
  public name;
  public description;
  public ckEditorConfig;
  public brand;
  public categoryId;
  public editFlag = false;
  public Editor = ClassicEditor;
  public categories;
  public bulkAction;

  public category: CategoriesInterface = {
    // @ts-ignore
    id: {},
    createdAt: {},
    position: 0,
    active: 1,
    type: 1,
    name: '',
    slug: '',
    description: '',
    subCategories: []
  };

  public preloadData = [{
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    name: '/noData',
    subCategories: []
  }];
  public dataSource;
  public displayedColumns: string[] = [
    'select',
    'position',
    'active',
    'name',
    'slug',
    'createdAt',
    'action'
  ];
  public selection = new SelectionModel(true, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<CategoriesInterface>;


  constructor(private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.ckEditorConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          'blockQuote',
          'bulletedList',
          'numberedList',
          'removeFormat',
          '|',
          'indent',
          'outdent',
          'alignment',
          '|',
          'link',
          'imageUpload',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          'exportPdf',
          'horizontalLine',
          'highlight',
          'fontSize'
        ]
      },
      mediaEmbed: {
        previewsInData: true
      },
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:full',
          'imageStyle:side'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableCellProperties',
          'tableProperties'
        ]
      },
      language: 'ru',
      licenseKey: '',
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.description = this.description || '';
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
      this.dataSource = new MatTableDataSource(data.subcategories);
      this.refreshTableRoutine();
    });
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.subcategoryService, SubcategoryDialogComponent, this.categoryId);
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.subcategoryService, this.categoryId);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.subcategoryService, this.categoryId);
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
