import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';

const MaterialComponents = [
  MatButtonModule,
  MatSidenavModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {
}
