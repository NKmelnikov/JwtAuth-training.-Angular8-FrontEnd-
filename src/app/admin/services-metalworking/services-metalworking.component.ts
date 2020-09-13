import {Component, OnInit, ViewChild, Injector} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {AdminBaseComponent} from '../admin.base-component';
import {environment} from '../../../environments/environment';
import {ServicesMetalworkingInterface} from './services-metalworking.interface';
import {ServicesMetalworkingDialogComponent} from './services-metalworking-dialog/services-metalworking-dialog.component';


@Component({
  selector: 'app-services-metalworking',
  templateUrl: './services-metalworking.component.html',
  styleUrls: ['./services-metalworking.component.scss']
})
export class ServicesMetalworkingComponent extends AdminBaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }

  public brands;
  public env = environment;
  public preloadData = [{id: 0, name: '0'}];
  public displayedColumns: string[] = [
    'select',
    'imgPath',
    'position',
    'active',
    'name',
    'created_at',
    'action'
  ];

  @ViewChild('table', {static: true}) table: MatTable<ServicesMetalworkingInterface>;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.preloadData);
    this.refreshTable();
  }

  refreshTable() {
    this.brands = this.metalworkingService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.refreshTableRoutine();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    super.drop(event, this.metalworkingService);
  }

  onBulkActionChange($event) {
    super.onBulkActionChange($event, this.metalworkingService);
  }

  openDialog(action, obj?) {
    super.openDialog(action, obj, this.metalworkingService, ServicesMetalworkingDialogComponent);
  }

}
