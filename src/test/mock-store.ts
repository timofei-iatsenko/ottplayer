import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/internal/operators';

/**
 * Mock helper class for Store
 * @template {G} Global App or Feature state
 * @template {L} Local reducer state
 */
export class MockStore<L, G = any> extends Store<G> {

  private _fakeData: object = {};
  private fakeDataSubject = new BehaviorSubject<object>(this._fakeData);

  public select<K>(mapFn: (state: G) => K): Store<K> {
    return map.call(this.fakeDataSubject, mapFn);
  }

  constructor() {
    super(null, null, null);
  }

  public nextMock(mock: PartialRecursive<L>, ...keys: string[]) {
    let curMockLevel = this._fakeData = {};
    keys.forEach((key, idx) => {
      curMockLevel = curMockLevel[key] = idx === keys.length - 1 ? mock : {};
    });
    this.fakeDataSubject.next(this._fakeData);
  }

  public get fakeData() {
    return this._fakeData;
  }

  public dispatch() {
    return;
  }

}
