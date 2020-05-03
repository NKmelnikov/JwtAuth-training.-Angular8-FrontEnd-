import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NewsInterface} from '../news.interface';
import {UploadHelper} from '../../../_helpers';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent {

  action: string;
  localData: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public Editor = ClassicEditor;

  constructor(
    public dialogRef: MatDialogRef<NewsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: NewsInterface,
    public uploadHelper: UploadHelper
  ) {
    this.localData = {...data};
    this.action = this.localData.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const maxSize = 100000000; // 100mb
      const allowedTypes = ['image/png', 'image/jpeg', 'image/svg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      if (fileInput.target.files[0].size > maxSize) {
        this.imageError = `Maximum size allowed is ${maxSize / 1000} Mb`;
        return false;
      }

      if (!_.includes(allowedTypes, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgHeight = rs.currentTarget['height'];
          const imgWidth = rs.currentTarget['width'];

          if (imgHeight > maxHeight && imgWidth > maxWidth) {
            this.imageError = `Maximum dimentions allowed ${maxHeight}*${maxWidth}px`;
            return false;
          }
          this.cardImageBase64 = e.target.result;
          this.isImageSaved = true;
          console.log(this.cardImageBase64);
          this.uploadHelper.uploadFile(this.cardImageBase64)
            .subscribe(data => console.log(data));
          // this.b64toFile(this.cardImageBase64, `assets/img/uploaded/${fileInput.target.files[0].name}`, fileInput.target.files[0].type);
          // this.previewImagePath = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  b64toFile(b64Data, filename, contentType) {
    b64Data = b64Data.replace(/^data:image\/\w+;base64,/, '');
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const file = new File(byteArrays, filename, {type: contentType});
    console.log(file);
    return file;
  }

}
