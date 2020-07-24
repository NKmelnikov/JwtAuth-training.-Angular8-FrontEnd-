import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {ProductsDrillInterface} from './products-drill.interface';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatTableDataSource, MatTable} from '@angular/material';
import {AdminBaseComponent} from '../admin.base-component';
import {ProductsDrillDialogComponent} from './products-drill-dialog/products-drill-dialog.component';

@Component({
  selector: 'app-products-drill',
  templateUrl: './products-drill.component.html',
  styleUrls: ['./products-drill.component.scss']
})
export class ProductsDrillComponent extends AdminBaseComponent implements OnInit {

  readonly typeDrill = 2;

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
    brand: {name: 'noData'},
    category: {name: 'noData'},
    subcategory: {name: 'noData'},
    name: 'noData',
    description: 'noData',
    pdfPath: 'noData',
  }];

  public displayedColumns: string[] = [
    'select',
    'position',
    'active',
    'brand',
    'category',
    'subcategory',
    'name',
    'description',
    'pdfPath',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<ProductsDrillInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.products = this.productDrillService.getAll()
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
              return el.type === this.typeDrill;
            })
          };
        });
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.productDrillService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.productDrillService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.productDrillService, ProductsDrillDialogComponent);
  }

}
