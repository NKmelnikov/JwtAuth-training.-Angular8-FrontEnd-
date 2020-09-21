import {Component, Inject, OnInit, Optional} from '@angular/core';
import {CatalogsInterface} from '../../../admin/catalogs/catalogs.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-products-oil-dialog-home',
  templateUrl: './products-oil-dialog-home.component.html',
  styleUrls: ['./products-oil-dialog-home.component.scss']
})
export class ProductsOilDialogHomeComponent implements OnInit {

  localData;
  action;
  email;
  comment;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CatalogsInterface,
    public dialogRef: MatDialogRef<ProductsOilDialogHomeComponent>,
  ) {
    this.localData = data;
    this.action = this.localData.action;
  }

  ngOnInit(): void {
  }

  actionTranslateMapping(action) {
    switch (action) {
      case 'request':
        return 'Запросить цену';
      case 'order':
        return 'Заказать';
    }
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'cancel'});
  }
}
