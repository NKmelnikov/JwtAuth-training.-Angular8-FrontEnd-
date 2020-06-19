import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatalogsInterface} from '../../../catalogs/catalogs.interface';
import {UploadHelper} from '../../../../_helpers';
import {environment} from '../../../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.sass']
})
export class SubcategoryDialogComponent implements OnInit {

  action: string;
  localData: any;
  selectedValue: string;
  public ckEditorConfig;
  public Editor = ClassicEditor;

  constructor(
    public dialogRef: MatDialogRef<SubcategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
    public uploadHelper: UploadHelper
  ) {
    this.localData = {...data};
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.localData.subCategoryDescription = this.localData.subCategoryDescription || '';
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
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
