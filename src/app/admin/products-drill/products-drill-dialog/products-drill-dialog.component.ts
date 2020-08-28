import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsDrillInterface} from '../products-drill.interface';
import {environment} from '../../../../environments/environment';
import * as ClassicEditor from '../../../_helpers/ckeditor';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';

@Component({
  selector: 'app-products-drill-dialog',
  templateUrl: './products-drill-dialog.component.html',
  styleUrls: ['./products-drill-dialog.component.scss']
})
export class ProductsDrillDialogComponent extends AdminBaseDialogComponent implements OnInit {

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

  constructor(
    public injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductsDrillInterface,
    public dialogRef: MatDialogRef<ProductsDrillDialogComponent>
  ) {
    super(injector);
    this.localData = {...data};
    this.selectedValueBrand = this.localData.brand_id;
    this.selectedValueCategory = this.localData.category_id;
    this.selectedValueSubCategory = this.localData.subcategory_id;


    // if (this.localData.brand) {
    //   this.selectedValueBrand = this.localData.brand.name;
    //   this.selectedValueCategory = this.localData.category.name;
    //   this.selectedValueSubCategory = this.localData.subcategory.name;
    // }

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
    this.localData.productSpec = this.localData.productSpec || '';
  }

  categorySelectChange(category) {
    this.localData.category = category;
  }

  subcategorySelectChange(subcategory) {
    this.localData.subcategory = subcategory;
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
