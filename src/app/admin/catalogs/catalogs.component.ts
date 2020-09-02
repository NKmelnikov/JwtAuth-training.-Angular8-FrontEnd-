import {Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {CatalogsDialogComponent} from './catalogs-dialog/catalogs-dialog.component';
import {CatalogsInterface} from './catalogs.interface';
import {AdminBaseComponent} from '../admin.base-component';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsComponent extends AdminBaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  public catalogs;
  public brandList;
  public env = environment;
  public preloadData = [{id: 0}];

  public displayedColumns: string[] = [
    'select',
    'imgPath',
    'position',
    'active',
    'name',
    'brandName',
    'pdfPath',
    'createdAt',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<CatalogsInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.catalogs = this.catalogService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.refreshTableRoutine();
        this.brandService.getAll().subscribe(brandList => {
          this.brandList = {brandList};
          this.dataSource.data.forEach((el) => {
            el.brandList = brandList;
          });
        });
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.catalogService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.catalogService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.catalogService, CatalogsDialogComponent);
  }
}
