import { Component, OnInit } from '@angular/core';
import {BrandService, CatalogService} from '../../_services';
import {environment} from '../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsHomeComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private brandService: BrandService,
    public sanitizer: DomSanitizer
  ) { }

  public catalogList = [];
  public brandList = [];
  public selectedBrand = '';
  public env = environment;

  ngOnInit(): void {
    this.catalogService.getAll()
      .subscribe(data => {
        this.catalogList = data;
        console.log(this.catalogList);
      });
    this.brandService.getAll()
      .subscribe(data => {
        this.brandList = data;
        console.log(this.brandList);
      });
  }

  selectBrand(brand){
    this.selectedBrand = (this.selectedBrand !== brand.$oid) ? brand.$oid : '';
    console.log(this.selectedBrand);
  }
}
