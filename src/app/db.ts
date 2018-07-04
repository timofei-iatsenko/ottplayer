import Dexie from 'dexie';
import { EpgEntry } from './entities/epg-entry';
import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Observable } from 'rxjs/index';


@Injectable({
  providedIn: 'root',
})
export class OttDataBase extends Dexie {
  public epg: Dexie.Table<EpgEntry, number>;

  constructor() {
    super('OttPlayerDb');

    this.version(1).stores({
      epg: '++, *chId',
    });
  }

  public queryChannelEpg(channelId: number): Observable<EpgEntry[]> {
    return fromPromise(this.epg
      .where({ chId: channelId })
      .toArray());
  }
}

export const db = new OttDataBase();
