import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
    imports: [
        MaterialModule,
        FormsModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        TranslocoModule
    ]
})
export class LayoutModule {
}
