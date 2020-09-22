import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {DataService, ProductOilService} from '../../../_services';
import {Subscription} from 'rxjs';
import {ProductsOilDialogHomeComponent} from '../products-oil-dialog-home/products-oil-dialog-home.component';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-products-oil-item',
  templateUrl: './products-oil-item.component.html',
  styleUrls: ['./products-oil-item.component.scss']
})
export class ProductsOilItemComponent implements OnInit {

  public env = environment;
  public productsToShow = [];
  public subscriptions = new Subscription();
  public product = {
    imgPath: '',
    name: '',
    description: '',
    spec: '',
    pdf1Path: '',
    pdf2Path: '',
    pdf1Name: '',
    pdf2Name: ''
  };

  description;
  spec;

  constructor(
    private productOilService: ProductOilService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    // this.description = this.product.description;
    // this.spec = this.product.spec;
  }

  ngOnInit(): void {
    this.getProductBySlug();
  }

  getProductBySlug() {
    const slug = document.location.pathname.split('/');
    const data = JSON.stringify(slug[slug.length - 1]);
    this.productOilService.getProductBySlug(data)
      .subscribe(product => {
        // @ts-ignore
        this.product = product;
        this.description = this.getInnerHTMLDescription();
        this.spec = this.getInnerHTMLSpec();
      });
  }

  openDialog(action, obj) {
    obj = obj || {};
    obj.action = action;
    this.dialog.open(ProductsOilDialogHomeComponent, {
      width: '320px',
      data: obj,
      panelClass: 'formFieldWidth752'
    });
  }

  getInnerHTMLDescription() {
    return this.sanitizer.bypassSecurityTrustHtml(this.product.description);
  }

  getInnerHTMLSpec() {
    return this.sanitizer.bypassSecurityTrustHtml(this.product.spec);
  }
}
