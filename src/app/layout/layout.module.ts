import {NgModule} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent
  ],
  imports: []
})
export class LayoutModule {
}
