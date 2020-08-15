import {Component, OnInit, AfterViewInit} from '@angular/core';
import {BrandService, CatalogService} from '../../_services';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.scss']
})
export class CatalogsHomeComponent implements OnInit {

  constructor(
    private catalogService: CatalogService,
    private brandService: BrandService,
    private router: Router
  ) {
  }

  public catalogList = [];
  public brandList = [];
  public selectedBrand = '';
  public activeBrand = false;
  public env = environment;
  public finalCatalogList = [];
  public page = 1;
  public pageSize = 8;

  ngOnInit(): void {
    this.catalogService.getAll()
      .subscribe(data => {
        this.catalogList = data;
        this.finalCatalogList = data;
      });
    this.brandService.getAll()
      .subscribe(data => {
        this.brandList = data;
      });
  }


  selectBrand(brand) {
    const selectedCatalogs = [];
    this.brandList.forEach(el => {
      el.activeBrand = false;
    });

    this.catalogList.forEach(el => {
      if (el.brand.$oid === brand._id.$oid) {
        selectedCatalogs.push(el);
      }
    });

    this.selectedBrand = (this.selectedBrand !== brand._id.$oid) ? brand._id.$oid : '';

    if (this.selectedBrand === '') {
      this.finalCatalogList = this.catalogList;
      brand.activeBrand = false;
    } else {
      this.finalCatalogList = selectedCatalogs;
      brand.activeBrand = true;
    }
  }

  hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
  }

  goToCatalog(brand) {
    this.router.navigate([`/catalogs/${brand.name.toLowerCase()}`]);
  }
}
