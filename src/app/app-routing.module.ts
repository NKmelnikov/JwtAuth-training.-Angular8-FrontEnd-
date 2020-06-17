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
import {CatalogsComponent} from './admin/catalogs/catalogs.component';
import {CatalogsHomeComponent} from './home/catalogs/catalogs.component';
import {CategoriesOilComponent} from './admin/categories-oil/categories-oil.component';
import {CategoriesOilEditComponent} from './admin/categories-oil/categories-oil-edit/categories-oil-edit.component';
import {CategoriesDrillComponent} from './admin/categories-drill/categories-drill.component';
import {CategoriesDrillEditComponent} from './admin/categories-drill/categories-drill-edit/categories-drill-edit.component';
import {ProductsOilComponent} from './admin/products-oil/products-oil.component';
import {ProductsDrillComponent} from './admin/products-drill/products-drill.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', component: MainComponent},
      {path: 'catalogs', component: CatalogsHomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },

  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {path: '', component: DashboardComponent},
      {path: 'news', component: NewsComponent},
      {path: 'brands', component: BrandsComponent},
      {path: 'catalogs', component: CatalogsComponent},
      {path: 'categories-oil', component: CategoriesOilComponent},
      {path: 'categories-oil/add', component: CategoriesOilEditComponent},
      {path: 'categories-oil/edit/:id', component: CategoriesOilEditComponent},
      {path: 'categories-drill', component: CategoriesDrillComponent},
      {path: 'categories-drill/add', component: CategoriesDrillEditComponent},
      {path: 'categories-drill/edit/:id', component: CategoriesDrillEditComponent},
      {path: 'products-oil', component: ProductsOilComponent},
      {path: 'products-drill', component: ProductsDrillComponent},
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
