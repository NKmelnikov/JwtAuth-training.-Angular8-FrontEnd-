import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {BrandService} from '../../../_services';
import {environment} from '../../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {

  public brand = {
    description: '',
    catalogs: []
  };

  public page = 1;
  public pageSize = 8;
  public env = environment;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
      if (!_.isEmpty(param)) {
        this.brandService.getBrandBySlug(JSON.stringify(param['slug']))
          .subscribe((brand) => {
            // @ts-ignore
            this.brand = brand[0];
            // @ts-ignore
            this.brand.description = this.sanitizer.bypassSecurityTrustHtml(this.brand.description);
            console.log(this.brand);
          });
      }
    });
  }
}
