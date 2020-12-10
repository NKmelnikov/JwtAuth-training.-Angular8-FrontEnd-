import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsOilInterface} from '../products-oil.interface';
import {environment} from '../../../../environments/environment';
import * as ClassicEditor from '../../../_helpers/ckeditor';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';
import {SubCategoryService} from '../../../_services';
import 'froala-editor/js/plugins.pkgd.min.js';

// @ts-ignore
@Component({
  selector: 'app-products-oil-dialog',
  templateUrl: './products-oil-dialog.component.html',
  styleUrls: ['./products-oil-dialog.component.scss']
})

export class ProductsOilDialogComponent extends AdminBaseDialogComponent implements OnInit {

  action: string;
  localData: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  selectedValueBrand: number;
  selectedValueCategory: number;
  selectedValueSubCategory: number;
  public ckEditorConfig;
  public Editor = ClassicEditor;
  public options: Object = {
    placeholderText: "Start typing...",
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
    public injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductsOilInterface,
    public dialogRef: MatDialogRef<ProductsOilDialogComponent>,
    public subcategoryService: SubCategoryService
  ) {
    super(injector);
    this.localData = {...data};
    this.localData.active = 1;
    this.action = this.localData.action;
    this.selectedValueBrand = this.localData.brand_id;
    this.selectedValueCategory = this.localData.category_id;
    this.selectedValueSubCategory = this.localData.subcategory_id;
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
    this.localData.spec = this.localData.spec || '';
  }

  categorySelectChange(categoryId) {
    this.localData.category_id = categoryId;
    this.subcategoryService.getByCategoryId(JSON.stringify(categoryId))
      .subscribe(data => {
        this.localData.subcategoryList = data;
      });
  }

  subcategorySelectChange(subcategoryId) {
    this.localData.subcategory_id = subcategoryId;
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
