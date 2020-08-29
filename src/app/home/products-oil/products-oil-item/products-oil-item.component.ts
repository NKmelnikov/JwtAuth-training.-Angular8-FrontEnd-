import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {DataService, ProductOilService} from '../../../_services';
import {Subscription} from 'rxjs';

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

  constructor(
    private productOilService: ProductOilService,
  ) {
  }

  ngOnInit(): void {
    this.getProductBySlug();

  }

  getProductBySlug() {
    const slug = document.location.pathname.split('/');
    const data = JSON.stringify(slug[slug.length - 1]);
    console.log(slug);
    this.productOilService.getProductBySlug(data)
      .subscribe(product => {
        // @ts-ignore
        this.product = product;
        this.product.pdf1Name = this.getPdfNameFromPath(this.product.pdf1Path);
        this.product.pdf2Name = this.getPdfNameFromPath(this.product.pdf2Path);
      });
  }

  getPdfNameFromPath(path) {
    return path.replace(this.env.pdfFilePath, '');
  }
}
