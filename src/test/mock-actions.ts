import { Actions } from '@ngrx/effects';
import {EMPTY, Observable} from 'rxjs';

export class MockActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}
