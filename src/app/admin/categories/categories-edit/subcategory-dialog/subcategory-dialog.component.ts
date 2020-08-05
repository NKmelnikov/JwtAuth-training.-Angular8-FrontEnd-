import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatalogsInterface} from '../../../catalogs/catalogs.interface';
import {environment} from '../../../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.scss']
})
export class SubcategoryDialogComponent implements OnInit {

  action: string;
  localData: any;
  public ckEditorConfig;
  public Editor = ClassicEditor;

  constructor(
    public dialogRef: MatDialogRef<SubcategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
  ) {
    this.localData = {...data};
    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.localData.description = this.localData.description || '';
  }

  actionTitleMapping(action) {
    switch (action) {
      case 'Create':
        return 'Создать подкатегорию';
      case 'Update':
        return 'Редактировать подкатегорию';
      case 'Delete':
        return 'Удалить подкатегорию';
    }
  }

  actionButtonMapping(action) {
    switch (action) {
      case 'Create':
        return 'Создать';
      case 'Update':
        return 'Сохранить';
      case 'Delete':
        return 'Удалить';
    }
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
