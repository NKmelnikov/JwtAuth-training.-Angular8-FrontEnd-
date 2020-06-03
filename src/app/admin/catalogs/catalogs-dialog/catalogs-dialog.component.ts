import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatalogsInterface} from '../catalogs.interface';
import {UploadHelper} from '../../../_helpers';
import {environment} from '../../../../environments/environment';
import * as _ from 'lodash';


@Component({
  selector: 'app-catalogs-dialog',
  templateUrl: './catalogs-dialog.component.html',
  styleUrls: ['./catalogs-dialog.component.scss']
})
export class CatalogsDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;
  selectedValue: string;

  constructor(
    public dialogRef: MatDialogRef<CatalogsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
    public uploadHelper: UploadHelper
  ) {
    this.localData = {...data};
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
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  brandSelectChange(brand) {
    this.localData.brand = brand;
  }

  pdfInputChange(fileInput: any) {
    const pdf = fileInput.target.files[0];
    const maxSize = 100000000; // 100mb TODO put into config file
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
        this.localData.catalogPdfPath = data.path;
        this.localData.catalogPdfName = data.name;
      });
  }
}
