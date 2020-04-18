import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewsComponent
  ],
  imports: [
    MaterialModule,
    RouterModule
  ],
  exports: [
    AdminComponent,
    DashboardComponent,
    NewsComponent
  ]
})
export class AdminModule {
}
