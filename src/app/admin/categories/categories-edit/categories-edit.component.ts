import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {UploadHelper} from '../../../_helpers';
import {CategoryService} from '../../../_services';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CategoriesInterface} from '../categories.interface';
import {Location} from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

  public active;
  // @ts-ignore
  public category: CategoriesInterface = {
    _id: {},
    createdAt: {},
    position: 0,
    active: 1,
    categoryType: 1,
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
    public categoryService: CategoryService,
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
    this.categoryService.getCategoryById(params).subscribe(data => {
      // @ts-ignore
      this.category = data;
    });
  }

  back() {
    this.location.back();
  }

  createOrEditCategory() {
    if (!this.editFlag) {
      this.categoryService.createCategory(this.category)
        .subscribe(data => console.log(data));
      this.router.navigate(['/admin/categories/']);
      return 0;
    }

    this.categoryService.updateCategory(this.category)
      .subscribe(data => console.log(data));
    this.router.navigate(['/admin/categories/']);
  }
}
