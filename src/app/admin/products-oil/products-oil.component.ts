import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, Injector} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {BrandService, CategoryService, ProductOilService} from '../../_services';
import clonedeep from 'lodash.clonedeep';
import {SelectionModel} from '@angular/cdk/collections';
import {ProductsOilDialogComponent} from './products-oil-dialog/products-oil-dialog.component';
import {ProductsOilInterface} from './products-oil.interface';
import {AdminBaseComponent} from '../admin.base-component';
import {BrandsDialogComponent} from '../brands/brands-dialog/brands-dialog.component';

@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilComponent extends AdminBaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  public products;
  public brandList;
  public categoryList;
  public dropDownData;

  public preloadData = [{
    _id: {$oid: 'noData'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    brand: {brandName: 'noData'},
    category: {categoryName: 'noData'},
    subcategory: {subCategoryName: 'noData'},
    productName: 'noData',
    productDescription: 'noData',
    productSpec: 'noData',
    productImgPath: 'noData',
    productPdf1Path: 'noData',
    productPdf2Path: '/noData'
  }];

  public displayedColumns: string[] = [
    'select',
    'position',
    'active',
    'brand',
    'category',
    'subcategory',
    'productName',
    'productDescription',
    'productSpec',
    'productImgPath',
    'productPdf1Path',
    'productPdf2Path',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<ProductsOilInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.products = this.productOilService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //
        // this.dataSource.data[0].category.subCategories.forEach((el) => {
        //   if (el.sub_id.$oid === this.dataSource.data[0].subCategory_id.$oid) {
        //     this.dataSource.data[0].subcategory = el;
        //   }
        // });

        super.refreshTableRoutine();

        this.brandService.getAll().subscribe(brandList => {
          this.brandList = {brandList};
          this.dataSource.data.forEach((el) => {
            el.brandList = brandList;
          });
        });

        this.categoryService.getAll().subscribe(categoryList => {
          this.categoryList = {categoryList};
          this.dataSource.data.forEach((el) => {
            el.categoryList = categoryList;
          });

          this.dropDownData = [{...this.brandList}, {...this.categoryList}];
        });


        console.log(this.dataSource.data[0]);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.productOilService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.productOilService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.productOilService, ProductsOilDialogComponent);
  }

}
