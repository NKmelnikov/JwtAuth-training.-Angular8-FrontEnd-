import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatalogsInterface} from '../catalogs.interface';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';


@Component({
  selector: 'app-catalogs-dialog',
  templateUrl: './catalogs-dialog.component.html',
  styleUrls: ['./catalogs-dialog.component.scss']
})
export class CatalogsDialogComponent extends AdminBaseDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;

  constructor(
    public injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
    public dialogRef: MatDialogRef<CatalogsDialogComponent>,
  ) {
    super(injector);
    this.localData = {...data};
    this.selectedValue = this.localData.brand_id;
    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
  }

  actionTranslateMapping(action) {
    switch (action) {
      case 'Create':
        return 'Создать';
      case 'Update':
        return 'Обновить';
      case 'Delete':
        return 'Удалить';
    }
  }

  doAction() {
    super.doAction(this.dialogRef);
  }

  closeDialog() {
    super.closeDialog(this.dialogRef);
  }

  fileChangeEvent(fileInput: any) {
    return super.fileChangeEvent(fileInput);
  }

  pdfInputChange(fileInput: any, entityPath, entityName) {
    return super.pdfInputChange(fileInput, entityPath, entityName);
  }
}
