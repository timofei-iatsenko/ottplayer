import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPageComponent} from './components/settings-page/settings-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: SettingsPageComponent}
    ])
  ],
  declarations: [SettingsPageComponent]
})
export class SettingsModule {
}
