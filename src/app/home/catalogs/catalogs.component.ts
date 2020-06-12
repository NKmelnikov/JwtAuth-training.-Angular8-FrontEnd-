import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BrandService, CatalogService} from '../../_services';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsHomeComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private brandService: BrandService,
  ) {
  }

  public catalogList = [];
  public brandList = [];
  public selectedBrand = '';
  public activeBrand = false;
  public env = environment;

  ngOnInit(): void {
    this.catalogService.getAll()
      .subscribe(data => {
        this.catalogList = data;
      });
    this.brandService.getAll()
      .subscribe(data => {
        this.brandList = data;
      });

    // for (let i = 0, len = vc.length; i < len; i++) {
    //   // vc[i].style['overflow'] = 'hidden';
    //   console.log(vc[i]);
    //   console.log(i);
    // }
  }


  selectBrand(brandId, brand) {
    this.brandList.forEach(el => {
      el.activeBrand = false;
    });
    this.selectedBrand = (this.selectedBrand !== brandId.$oid) ? brandId.$oid : '';
    brand.activeBrand = !brand.activeBrand;
    // if (brand.activeBrand === true) {
    //   brand.activeBrand = false;
    // }
  }
}
