import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import * as ClassicEditor from '../../../_helpers/ckeditor';
import {environment} from '../../../../environments/environment';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';
import {ServicesMetalworkingInterface} from '../services-metalworking.interface';


@Component({
  selector: 'app-services-metalworking-dialog',
  templateUrl: './services-metalworking-dialog.component.html',
  styleUrls: ['./services-metalworking-dialog.component.scss']
})
export class ServicesMetalworkingDialogComponent extends AdminBaseDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public ckEditorConfig;
  public Editor = ClassicEditor;

  constructor(
    public dialogRef: MatDialogRef<ServicesMetalworkingDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ServicesMetalworkingInterface,
    public injector: Injector
  ) {
    super(injector);
    this.localData = {...data};
    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'subscript',
          'superscript',
          'blockQuote',
          'bulletedList',
          'numberedList',
          'removeFormat',
          '|',
          'indent',
          'outdent',
          'alignment',
          '|',
          'link',
          'imageUpload',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
          'exportPdf',
          'horizontalLine',
          'highlight',
          'fontSize'
        ]
      },
      mediaEmbed: {
        previewsInData: true
      },
      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:full',
          'imageStyle:side'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableCellProperties',
          'tableProperties'
        ]
      },
      language: 'ru',
      licenseKey: '',
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.localData.description = this.localData.description || '';
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
    return super.fileChangeEvent(fileInput);
  }
}
