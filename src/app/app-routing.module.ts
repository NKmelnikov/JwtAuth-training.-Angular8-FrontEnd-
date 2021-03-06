import {NgModule} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuardService} from './_services';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {NewsComponent} from './admin/news/news.component';
import {NewsHomeComponent} from './home/news/news.component';
import {MainComponent} from './home/main/main.component';
import {BrandsComponent} from './admin/brands/brands.component';
import {CatalogsComponent} from './admin/catalogs/catalogs.component';
import {CatalogsHomeComponent} from './home/catalogs/catalogs.component';
import {CategoriesComponent} from './admin/categories/categories.component';
import {CategoriesEditComponent} from './admin/categories/categories-edit/categories-edit.component';
import {ProductsOilComponent} from './admin/products-oil/products-oil.component';
import {ProductsOilHomeComponent} from './home/products-oil/products-oil.component';
import {ProductsDrillHomeComponent} from './home/products-drill/products-drill.component';
import {AboutComponent} from './home/about/about.component';
import {ProductsOilItemComponent} from './home/products-oil/products-oil-item/products-oil-item.component';
import {ProductsOilListComponent} from './home/products-oil/products-oil-list/products-oil-list.component';
import {ProductsOilCategoryListComponent} from './home/products-oil/products-oil-category-list/products-oil-category-list.component';
import {ProductsOilSubcategoryListComponent} from './home/products-oil/products-oil-subcategory-list/products-oil-subcategory-list.component';
import {CatalogItemComponent} from './home/catalogs/catalog-item/catalog-item.component';
import {PageNotFoundComponent} from './home/page-not-found/page-not-found.component';
import {ServicesComponent} from './home/services/services.component';
import {ServicesMetalworkingHomeComponent} from './home/services-metalworking/services-metalworking.component';
import {ServicesMetalworkingComponent} from './admin/services-metalworking/services-metalworking.component';
import {ServicesRecoveryComponent} from './home/services-recovery/services-recovery.component';
import {NewsItemComponent} from './home/news-item/news-item.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'catalogs',
        component: CatalogsHomeComponent
      },
      {
        path: 'catalogs/:slug',
        component: CatalogItemComponent
      },
      {
        path: 'products',
        component: ProductsOilHomeComponent,
        children: [
          {
            path: '',
            component: ProductsOilListComponent,
          },
          {
            path: ':categorySlug',
            component: ProductsOilCategoryListComponent
          },
          {
            path: ':categorySlug/:subcategorySlug',
            component: ProductsOilSubcategoryListComponent
          },
          {
            path: ':categorySlug/no-subcategory/:productSlug',
            component: ProductsOilItemComponent,
          },
          {
            path: ':categorySlug/:subcategorySlug/:productSlug',
            component: ProductsOilItemComponent,
          },
        ]
      },
      {
        path: 'products/drill',
        component: ProductsDrillHomeComponent
      },
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'services/metalworking',
        component: ServicesMetalworkingHomeComponent
      },
      {
        path: 'services/recovery',
        component: ServicesRecoveryComponent
      },
      {
        path: 'news',
        component: NewsHomeComponent
      },
      {
        path: 'news/:newsSlug',
        component: NewsItemComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'brands',
        component: BrandsComponent
      },
      {
        path: 'catalogs',
        component: CatalogsComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/add',
        component: CategoriesEditComponent
      },
      {
        path: 'categories/edit/:id',
        component: CategoriesEditComponent
      },
      {
        path: 'products',
        component: ProductsOilComponent
      },
      // {path: 'products-drill', component: ProductsDrillComponent},
      {
        path: 'services-metalworking',
        component: ServicesMetalworkingComponent
      },
    ]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
