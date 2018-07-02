import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ChangeSettings } from '@store/actions/settings.actions';
import { AppState } from '@store';

@Component({
  selector: 'settings-page',
  template: `
    <div class="settings-wrap">
      <h2 class="title">Settings</h2>

      <form (submit)="handleSubmit($event, playlistInput.value, keyInput.value)" class="grid-form">
        <label class="block-field">
          <input #playlistInput
                 [value]="playlistUrl$ | async"
                 type='text'
                 name='playlist-url'/>
          <span class="field-label">Playlist Url</span>
        </label>

        <label class="block-field">
          <input #keyInput
                 [value]="currentKey$ | async"
                 type='text'
                 name='auth-key'/>
          <span class="field-label">Key</span>
        </label>

        <div class="form-actions">
          <button class="submit-btn"
                  type='submit'>Save
          </button>
          <button class="cancel-btn"
                  (click)="handleCancel()"
                  type='button'>Cancel
          </button>
        </div>
      </form>
    </div>`,
  styleUrls: ['./settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  public playlistUrl$ = this.store.pipe(select((state: AppState) => state.settings.playlistUrl));
  public currentKey$ = this.store.pipe(select((state: AppState) => state.settings.currentKey));

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  public handleSubmit($event: HTMLFormElement, playlistUrl: string, currentKey: string) {
    $event.preventDefault();
    const settings = {playlistUrl, currentKey};

    this.store.dispatch(new ChangeSettings({ settings }));
    this.router.navigate(['/']);
  }

  public handleCancel() {
    this.router.navigate(['/']);
  }
}
