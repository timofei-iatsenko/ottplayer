import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './components/app-header/app-header.component';
import { CastButtonComponent } from './components/cast-button/cast-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppHeaderComponent, CastButtonComponent],
  exports: [AppHeaderComponent, CastButtonComponent],
})
export class SharedModule {
}
