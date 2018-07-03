import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '@store';
import { GlobalModule } from './global/global.module';
import { EffectsModule } from '@ngrx/effects';
import { ChannelsEffects } from '@store/effects/channels.effects';
import { PlaylistGuard } from './channels/playlist.guard';
import { SettingsEffects } from '@store/effects/settings.effects';
import { EpgEffects } from '@store/effects/epg.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  { path: ':channelSlug', loadChildren: './channels/channels.module#ChannelsModule', canActivate: [PlaylistGuard]},
  { path: '', loadChildren: './channels/channels.module#ChannelsModule', canActivate: [PlaylistGuard]},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GlobalModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([
      ChannelsEffects,
      SettingsEffects,
      EpgEffects,
    ]),
    RouterModule.forRoot(
      appRoutes,
    ),
    (!environment.production) ? StoreDevtoolsModule.instrument({ maxAge: 2, }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
