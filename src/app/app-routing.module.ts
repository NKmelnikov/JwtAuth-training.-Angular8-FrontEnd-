import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './_helpers';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AppComponent} from './app.component';
import {NewsComponent} from './admin/news/news.component';
import {MainComponent} from './home/main/main.component';
import {BrandsComponent} from './admin/brands/brands.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', component: MainComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },

  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {path: '', component: DashboardComponent},
      {path: 'news', component: NewsComponent},
      {path: 'brands', component: BrandsComponent},
    ]
  },
  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
