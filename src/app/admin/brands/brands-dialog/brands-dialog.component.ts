import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrandsInterface} from '../brands.interface';
import {environment} from '../../../../environments/environment';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';
import 'froala-editor/js/plugins.pkgd.min.js';



@Component({
  selector: 'app-brands-dialog',
  templateUrl: './brands-dialog.component.html',
  styleUrls: ['./brands-dialog.component.scss']
})
export class BrandsDialogComponent extends AdminBaseDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
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
    public dialogRef: MatDialogRef<BrandsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: BrandsInterface,
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

  fileChangeEvent(fileInput: any) {
    return super.fileChangeEvent(fileInput);
  }
}
