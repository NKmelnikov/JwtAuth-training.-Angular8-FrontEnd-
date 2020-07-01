import {AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList} from '@angular/cdk/drag-drop';
import {BrandService, CategoryService, ProductOilService} from '../../_services';
import clonedeep from 'lodash.clonedeep';
import {SelectionModel} from '@angular/cdk/collections';
import {ProductsOilDialogComponent} from './products-oil-dialog/products-oil-dialog.component';
import {ProductsOilInterface} from './products-oil.interface';

@Component({
  selector: 'app-products-oil',
  templateUrl: './products-oil.component.html',
  styleUrls: ['./products-oil.component.scss']
})
export class ProductsOilComponent implements OnInit {

  // constructor(
  //   private categoryService: CategoryService,
  //   private brandService: BrandService,
  //   private productOilService: ProductOilService,
  //   private changeDetectorRefs: ChangeDetectorRef,
  //   private dialog: MatDialog
  // ) { }
  //
  // public products;
  // public brandList;
  // public categoryList;
  // public bulkAction;
  // public preloadData = [{
  //   _id: {$oid: 'noData'}, createdAt: {$date: 111111111111111},
  //   position: 1, active: 0, brandName: 'noData', categoryName: 'noData',
  //   subcategoryName: 'noData', productName: 'noData',
  //   productDescription: 'noData', productSpec: 'noData',
  //   productImgPath: 'noData', productPdf1Path: 'noData',
  //   productPdf2Path: '/noData'
  // }];
  // public dataSource;
  // public displayedColumns: string[] = [
  //   'select', 'position', 'active',
  //   'productName', 'brandName', 'categoryName',
  //   'subcategoryName', 'productName', 'productDescription',
  //   'productSpec', 'productImgPath', 'productPdf1Path',
  //   'productPdf2Path'
  // ];
  // public selection = new SelectionModel(true, []);
  //
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild('table', {static: true}) table: MatTable<ProductsOilInterface>;
  //
  ngOnInit(): void {
    // this.dataSource = new MatTableDataSource(this.preloadData);
    // this.refreshTable();
  }
  //
  // refreshTable() {
  //   this.products = this.productOilService.getAll()
  //     .subscribe(data => {
  //       this.dataSource = new MatTableDataSource(data);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //       this.bulkAction = null;
  //       this.selection.clear();
  //       this.changeDetectorRefs.detectChanges();
  //       this.brandService.getAll().subscribe(brandList => {
  //         this.brandList = {brandList};
  //         this.dataSource.data.forEach((el) => {
  //           el.brandList = brandList;
  //         });
  //       });
  //       this.categoryService.getAll().subscribe(categoryList => {
  //         this.categoryList = {categoryList};
  //         this.dataSource.data.forEach((el) => {
  //           el.categoryList = categoryList;
  //         });
  //       });
  //     });
  // }

}
