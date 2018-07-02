import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '@store';

const appRoutes: Routes = [
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  // { path: '/:channelSlug?', component: HeroListComponent },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    StoreModule.forRoot(rootReducer),
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
