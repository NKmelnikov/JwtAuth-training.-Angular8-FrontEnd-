import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UploadHelper} from '../../../_helpers';
import {CategoryOilService} from '../../../_services';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CategoriesOilInterface} from '../categories-oil.interface';
import {Location} from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';

@Component({
  selector: 'app-categories-oil-edit',
  templateUrl: './categories-oil-edit.component.html',
  styleUrls: ['./categories-oil-edit.component.scss']
})
export class CategoriesOilEditComponent implements OnInit {

  public active;
  // @ts-ignore
  public category: CategoriesOilInterface = {
    _id: {},
    createdAt: {},
    position: 0,
    active: 1,
    categoryName: '',
    categoryDescription: '',
    subCategories: []
  };
  public categoryName;
  public categoryDescription;
  public ckEditorConfig;
  public brandList;
  public brand;
  public categoryId?;
  public editFlag = false;
  public Editor = ClassicEditor;
  public selectedValue: string;


  constructor(
    public uploadHelper: UploadHelper,
    public categoryOilService: CategoryOilService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.ckEditorConfig = {
      ckfinder: {
        uploadUrl: `${environment.serverURL}ck-upload`
      }
    };
    this.categoryDescription = this.categoryDescription || '';
    this.route.params.subscribe((params: any) => {
      this.editFlag = false;
      if (!_.isEmpty(params)) {
        this.editFlag = true;
        this.getCategoryById(params);
      }
    });
  }

  getCategoryById(params) {
    this.categoryOilService.getCategoryByIdOil(params).subscribe(data => {
      // @ts-ignore
      this.category = data;
    });
  }

  back() {
    this.location.back();
  }

  createOrEditCategory() {
    if (!this.editFlag) {
      this.categoryOilService.createCategoryOil(this.category)
        .subscribe(data => console.log(data));
      this.router.navigate(['/admin/categories-oil/']);
      return 0;
    }

    this.categoryOilService.updateCategoryOil(this.category)
      .subscribe(data => console.log(data));
    this.router.navigate(['/admin/categories-oil/']);
  }
}
