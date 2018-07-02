import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-wrap">
      <app-header></app-header>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
