import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.store.select((state) => !!state.settings.playlistUrl).pipe(
      tap((playlist) => !playlist && this.router.navigate(['/settings']))
    );
  }
}
