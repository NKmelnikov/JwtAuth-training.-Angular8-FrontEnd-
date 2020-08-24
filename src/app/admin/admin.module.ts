import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NewsDialogComponent} from './news/news-dialog/news-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {BrandsComponent} from './brands/brands.component';
import {BrandsDialogComponent} from './brands/brands-dialog/brands-dialog.component';
import {CatalogsComponent} from './catalogs/catalogs.component';
import {CatalogsDialogComponent} from './catalogs/catalogs-dialog/catalogs-dialog.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesEditComponent} from './categories/categories-edit/categories-edit.component';
import {ProductsDrillComponent} from './products-drill/products-drill.component';
import {ProductsOilComponent} from './products-oil/products-oil.component';
import {SubcategoryDialogComponent} from './categories/categories-edit/subcategory-dialog/subcategory-dialog.component';
import {ProductsOilDialogComponent} from './products-oil/products-oil-dialog/products-oil-dialog.component';
import {ProductsDrillDialogComponent} from './products-drill/products-drill-dialog/products-drill-dialog.component';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewsComponent,
    NewsDialogComponent,
    BrandsComponent,
    BrandsDialogComponent,
    CatalogsComponent,
    CatalogsDialogComponent,
    CategoriesComponent,
    ProductsDrillComponent,
    ProductsOilComponent,
    CategoriesEditComponent,
    SubcategoryDialogComponent,
    ProductsOilDialogComponent,
    ProductsDrillDialogComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    FormsModule,
    CKEditorModule,
    QuillModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    AdminComponent,
    DashboardComponent,
    NewsComponent,
    BrandsComponent,
    CatalogsComponent,
    CategoriesComponent,
    ProductsDrillComponent,
    ProductsOilComponent,
    CategoriesEditComponent,
  ],
  entryComponents: [
    NewsDialogComponent,
    BrandsDialogComponent,
    CatalogsDialogComponent,
    SubcategoryDialogComponent,
    ProductsOilDialogComponent,
    ProductsDrillDialogComponent,
  ]
})
export class AdminModule {
}
