import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CastButtonComponent } from './cast-button/cast-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppHeaderComponent,
    CastButtonComponent,
  ],
  exports: [
    AppHeaderComponent,
  ]
})
export class GlobalModule { }
