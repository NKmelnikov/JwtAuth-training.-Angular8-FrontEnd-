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

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewsComponent,
    NewsDialogComponent,
    BrandsComponent,
    BrandsDialogComponent
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
    NewsComponent
  ],
  entryComponents: [
    NewsDialogComponent
  ]
})
export class AdminModule {
}
