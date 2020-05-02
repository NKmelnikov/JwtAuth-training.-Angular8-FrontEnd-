import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewsComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    CommonModule,
  ],
  exports: [
    AdminComponent,
    DashboardComponent,
    NewsComponent
  ]
})
export class AdminModule {
}
