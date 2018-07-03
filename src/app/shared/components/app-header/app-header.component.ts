import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header-wrap">
      <div class="settings-btns">
        <cast-button></cast-button>
        <button class="btn"
                (click)="goToSettings()"
                title="Settings"
                type='button'>
          <!--<Cog/>-->
        </button>
      </div>
    </header>`,
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  public goToSettings() {
    //
  }
}
