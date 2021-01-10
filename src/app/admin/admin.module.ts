import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NewsDialogComponent} from './news/news-dialog/news-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrandsComponent} from './brands/brands.component';
import {BrandsDialogComponent} from './brands/brands-dialog/brands-dialog.component';
import {CatalogsComponent} from './catalogs/catalogs.component';
import {CatalogsDialogComponent} from './catalogs/catalogs-dialog/catalogs-dialog.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesEditComponent} from './categories/categories-edit/categories-edit.component';
import {ProductsOilComponent} from './products-oil/products-oil.component';
import {SubcategoryDialogComponent} from './categories/categories-edit/subcategory-dialog/subcategory-dialog.component';
import {ProductsOilDialogComponent} from './products-oil/products-oil-dialog/products-oil-dialog.component';
import {ServicesMetalworkingComponent} from './services-metalworking/services-metalworking.component';
import {ServicesMetalworkingDialogComponent} from './services-metalworking/services-metalworking-dialog/services-metalworking-dialog.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg'
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
    ProductsOilComponent,
    CategoriesEditComponent,
    SubcategoryDialogComponent,
    ProductsOilDialogComponent,
    ServicesMetalworkingComponent,
    ServicesMetalworkingDialogComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  exports: [
    AdminComponent,
    DashboardComponent,
    NewsComponent,
    BrandsComponent,
    CatalogsComponent,
    CategoriesComponent,
    ProductsOilComponent,
    CategoriesEditComponent,
    ServicesMetalworkingComponent,
  ],
  entryComponents: [
    NewsDialogComponent,
    BrandsDialogComponent,
    CatalogsDialogComponent,
    SubcategoryDialogComponent,
    ProductsOilDialogComponent,
  ]
})
export class AdminModule {
}
