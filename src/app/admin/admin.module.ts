import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NewsDialogComponent} from './news/news-dialog/news-dialog.component';
import {FormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {BrandsComponent} from './brands/brands.component';
import {BrandsDialogComponent} from './brands/brands-dialog/brands-dialog.component';
import {CatalogsComponent} from './catalogs/catalogs.component';
import {CatalogsDialogComponent} from './catalogs/catalogs-dialog/catalogs-dialog.component';
import {CategoriesOilComponent} from './categories-oil/categories-oil.component';
import {CategoriesDrillComponent} from './categories-drill/categories-drill.component';
import {ProductsDrillComponent} from './products-drill/products-drill.component';
import {ProductsOilComponent} from './products-oil/products-oil.component';
import {CategoriesOilEditComponent} from './categories-oil/categories-oil-edit/categories-oil-edit.component';
import {CategoriesDrillEditComponent} from './categories-drill/categories-drill-edit/categories-drill-edit.component';

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
    CategoriesOilComponent,
    CategoriesDrillComponent,
    ProductsDrillComponent,
    ProductsOilComponent,
    CategoriesOilEditComponent,
    CategoriesDrillEditComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
    FormsModule,
    CKEditorModule,
  ],
  exports: [
    AdminComponent,
    DashboardComponent,
    NewsComponent,
    BrandsComponent,
    CatalogsComponent,
    CategoriesOilComponent,
    CategoriesDrillComponent,
    ProductsDrillComponent,
    ProductsOilComponent,
    CategoriesOilEditComponent,
    CategoriesDrillEditComponent
  ],
  entryComponents: [
    NewsDialogComponent,
    BrandsDialogComponent,
    CatalogsDialogComponent
  ]
})
export class AdminModule {
}
