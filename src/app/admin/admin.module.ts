import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewsComponent} from './news/news.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewsComponent
  ],
  imports: [],
  exports: [
    AdminComponent,
    DashboardComponent,
    NewsComponent
  ]
})
export class AdminModule {
}
