import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NewsInterface} from '../news.interface';
import {UploadHelper} from '../../../_helpers';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';
import {environment} from '../../../../environments/environment';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.scss']
})
export class NewsDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public ckEditorConfig;
  public Editor;

  constructor(
    public dialogRef: MatDialogRef<NewsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: NewsInterface,
    public uploadHelper: UploadHelper
  ) {
    this.localData = {...data};
    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    ClassicEditor.builtinPlugins = [
      Indent, IndentBlock
    ];
    this.ckEditorConfig = {
      simpleUpload: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };

    this.Editor = ClassicEditor;
    this.localData.article = this.localData.article || '';
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

          const sendData = {
            name: fileInput.target.files[0].name,
            b64: this.cardImageBase64
          };

          this.uploadHelper.uploadImgFromB64(sendData)
            .subscribe(data => this.localData.imgPath = data.path);
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }
}
