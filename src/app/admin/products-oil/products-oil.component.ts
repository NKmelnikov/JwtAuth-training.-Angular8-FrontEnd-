import {Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {ProductsOilDialogComponent} from './products-oil-dialog/products-oil-dialog.component';
import {ProductsOilInterface} from './products-oil.interface';
import {AdminBaseComponent} from '../admin.base-component';
import {environment} from '../../../environments/environment';


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
  public subcategoryList;
  public dropDownData;
  public serverUrl;

  public preloadData = [{
    imgPath: environment.serverURL + 'files/img/default.jpg',
    _id: {$oid: 'noData'},
    createdAt: {$date: 111111111111111},
    position: 1,
    active: 0,
    brand: {name: 'noData'},
    category: {name: 'noData'},
    subcategory: {name: 'noData'},
    slug: 'noData',
    name: 'noData',
    description: 'noData',
    productSpec: 'noData',
    pdf1Path: 'noData',
    pdf2Path: '/noData'
  }];

  public displayedColumns: string[] = [
    'select',
    'imgPath',
    'name',
    'position',
    'active',
    'brand',
    'category',
    'subcategory',
    'slug',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<ProductsOilInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
    this.serverUrl = environment.serverURL;
  }

  refreshTable() {
    this.products = this.productOilService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        super.refreshTableRoutine();

        this.brandService.getAll().subscribe(brandList => {
          this.brandList = brandList;
          this.dataSource.data.forEach((el) => {
            el.brandList = brandList;
          });

          this.categoryService.getAll().subscribe(categoryList => {
            this.categoryList = categoryList.filter((el) => {
              return el.type === this.typeOil;
            });

            this.dataSource.data.forEach((el) => {
              el.categoryList = this.categoryList;
            });

            this.subcategoryService.getAll().subscribe(subcategoryList => {
              this.subcategoryList = subcategoryList;
              this.dataSource.data.forEach((el) => {
                el.subcategoryList = this.subcategoryList;
              });
            });

            console.log(this.dataSource.data);
            this.dropDownData = {
              brandList: this.brandList,
              categoryList: this.categoryList
            };
          });
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
