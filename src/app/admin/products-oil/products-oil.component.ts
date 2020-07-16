import {Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ProductsOilDialogComponent} from './products-oil-dialog/products-oil-dialog.component';
import {ProductsOilInterface} from './products-oil.interface';
import {AdminBaseComponent} from '../admin.base-component';

@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilComponent extends AdminBaseComponent implements OnInit {

  readonly typeOil = 1;

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

          this.dropDownData = {
            brandList: this.brandList.brandList,
            categoryList: this.categoryList.categoryList.filter((el) => {
              return el.categoryType === this.typeOil;
            })
          };
        });


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
