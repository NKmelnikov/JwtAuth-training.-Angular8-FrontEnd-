import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './auth/welcome/welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {LayoutModule} from './layout/layout.module';
import {AdminModule} from './admin/admin.module';
import {MainComponent} from './home/main/main.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CatalogsHomeComponent} from './home/catalogs/catalogs.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductsComponent} from './home/products/products.component';
import {AboutComponent} from './home/about/about.component';
import {ServicesComponent} from './home/services/services.component';
import {NewsHomeComponent} from './home/news/news.component';
import {ProductsOilHomeComponent} from './home/products-oil/products-oil.component';
import {ProductsDrillHomeComponent} from './home/products-drill/products-drill.component';
import {ProductsOilItemComponent} from './home/products-oil/products-oil-item/products-oil-item.component';
import {ProductsOilListComponent} from './home/products-oil/products-oil-list/products-oil-list.component';
import { CatalogItemComponent } from './home/catalogs/catalog-item/catalog-item.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import {AuthGuardService, AuthService, DataService, HttpInterceptorService, TokenService} from './_services';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    MainComponent,
    CatalogsHomeComponent,
    ProductsComponent,
    AboutComponent,
    NewsHomeComponent,
    ServicesComponent,
    ProductsDrillHomeComponent,
    ProductsOilHomeComponent,
    NewsHomeComponent,
    ProductsOilHomeComponent,
    ProductsDrillHomeComponent,
    ProductsOilItemComponent,
    ProductsOilListComponent,
    CatalogItemComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    AdminModule,
    CarouselModule,
    PdfViewerModule,
    NgbModule
  ],
  providers: [
    AuthService,
    TokenService,
    DataService,
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
