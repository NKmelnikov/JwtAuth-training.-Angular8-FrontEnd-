import {Component, Directive, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UploadHelper} from '../_helpers';
import * as _ from 'lodash';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AdminBaseDialogComponent {

  public action: string;
  public localData: any;
  public imageError: string;
  public isImageSaved: boolean;
  public cardImageBase64: string;
  public selectedValue: string;
  public uploadHelper: any;
  public ckEditorConfig;
  public Editor = ClassicEditor;

  protected constructor(
    protected injectorObj: Injector,
  ) {
    this.uploadHelper = this.injectorObj.get(UploadHelper);
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

  doAction(dialogRef) {
    dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog(dialogRef) {
    dialogRef.close({event: 'Cancel'});
  }

  brandSelectChange(brand) {
    this.localData.brand = brand;
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

  fileChangeEvent(fileInput: any, imgPathName) {
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
            .subscribe(data => this.localData[imgPathName] = data.path);
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  pdfInputChange(fileInput: any, entityPath, entityName) {
    const pdf = fileInput.target.files[0];
    const maxSize = 200000000; // 200mb TODO put into config file
    const allowedTypes = ['application/pdf'];

    if (pdf.size > maxSize) {
      this.imageError = `Максимальный размер ${maxSize / 1000} Mb`;
      console.error(this.imageError);
      return false;
    }

    if (!_.includes(allowedTypes, pdf.type)) {
      this.imageError = 'Загруженный файл не является .pdf';
      console.error(this.imageError);
      return false;
    }
    const formData: FormData = new FormData();
    formData.append('pdf_file', pdf, pdf.name);
    this.uploadHelper.uploadPdf(formData)
      .subscribe(data => {
        this.localData[entityPath] = data.path;
        this.localData[entityName] = data.name;
      });
  }

}
