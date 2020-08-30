import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsDrillInterface} from '../products-drill.interface';
import {environment} from '../../../../environments/environment';
import * as ClassicEditor from '../../../_helpers/ckeditor';
import {AdminBaseDialogComponent} from '../../admin.base-dialog.component';
import {SubCategoryService} from '../../../_services';

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
    public dialogRef: MatDialogRef<ProductsDrillDialogComponent>,
    public subcategoryService: SubCategoryService
  ) {
    super(injector);
    this.localData = {...data};
    this.selectedValueBrand = this.localData.brand_id;
    this.selectedValueCategory = this.localData.category_id;
    this.selectedValueSubCategory = this.localData.subcategory_id;
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
