import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  RouterModule,
  Routes,
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { rootReducer, REDUCER_TOKEN } from '@store';
import { GlobalModule } from './global/global.module';
import { EffectsModule } from '@ngrx/effects';
import { ChannelsEffects } from '@store/effects/channels.effects';
import { PlaylistGuard } from './channels/playlist.guard';
import { SettingsEffects } from '@store/effects/settings.effects';
import { EpgEffects } from '@store/effects/epg.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CastEffects } from '@store/effects/cast.effects';
import { PlayerEffects } from '@store/effects/player.effects';

const appRoutes: Routes = [
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  {
    path: ':channelSlug',
    data: { reuse: true },
    loadChildren: './channels/channels.module#ChannelsModule',
    canActivate: [PlaylistGuard],
  },
  {
    path: '',
    data: { reuse: true },
    loadChildren: './channels/channels.module#ChannelsModule',
    canActivate: [PlaylistGuard],
  },
];

export class CustomRouteReuseStrategy extends RouteReuseStrategy {
  public shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
  public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
  public shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle { return null; }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return (future.routeConfig === curr.routeConfig) || future.data.reuse;
  }
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GlobalModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([
      CastEffects,
      ChannelsEffects,
      SettingsEffects,
      EpgEffects,
      PlayerEffects,
    ]),
    RouterModule.forRoot(
      appRoutes,
    ),
    (!environment.production) ? StoreDevtoolsModule.instrument({ maxAge: 10 }) : [],
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
    {
      provide: REDUCER_TOKEN,
      useFactory: () => rootReducer,
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
