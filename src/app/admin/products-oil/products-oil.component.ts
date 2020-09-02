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
  public preloadData = [{id: 0}];

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
