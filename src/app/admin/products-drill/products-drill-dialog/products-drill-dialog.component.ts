import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProductsDrillInterface} from '../products-drill.interface';
import {environment} from '../../../../environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  selectedValueBrand: string;
  selectedValueCategory: string;
  selectedValueSubCategory: string;
  public ckEditorConfig;
  public Editor = ClassicEditor;

  constructor(
    public injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductsDrillInterface,
    public dialogRef: MatDialogRef<ProductsDrillDialogComponent>
  ) {
    super(injector);
    this.localData = {...data};
    console.log(this.localData);

    if (this.localData.brand) {
      this.selectedValueBrand = this.localData.brand.name;
      this.selectedValueCategory = this.localData.category.name;
      this.selectedValueSubCategory = this.localData.subcategory.name;
    }

    this.localData.active = 1;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
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
