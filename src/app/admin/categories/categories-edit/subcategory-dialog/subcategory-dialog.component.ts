import {
  Component,
  Inject,
  Injector,
  OnInit,
  Optional
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatalogsInterface} from '../../../catalogs/catalogs.interface';
import {environment} from '../../../../../environments/environment';
import 'froala-editor/js/plugins.pkgd.min.js';
import {AdminBaseDialogComponent} from '../../../admin.base-dialog.component';

@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.scss']
})
export class SubcategoryDialogComponent extends AdminBaseDialogComponent implements OnInit {

  action: string;
  localData: any;
  // tslint:disable-next-line:ban-types
  public frolaOptions: Object = {
    placeholderText: 'Start typing...',
    imageUpload: true,
    imageTextNear: true,
    imageMove: true,
    imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],
    imageAltButtons: ['imageBack'],
    imagePaste: true,
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
    imageUploadURL: `${environment.serverURL}ck-upload`
  };

  constructor(
    public dialogRef: MatDialogRef<SubcategoryDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
    public injector: Injector
  ) {
    super(injector);
    this.localData = {...data};
    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    this.localData.description = this.localData.description || '';
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
