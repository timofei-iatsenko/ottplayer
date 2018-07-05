import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
          <i class="material-icons">settings</i>
        </button>
      </div>
    </header>`,
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  constructor(
    private router: Router,
  ) {}

  public goToSettings() {
    this.router.navigate(['/settings']);
  }
}
