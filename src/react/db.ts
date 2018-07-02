import Dexie from 'dexie';
import { EpgEntry } from './entities/epg-entry';

export class OttDataBase extends Dexie {
  public epg: Dexie.Table<EpgEntry, number>;

  constructor() {
    super('OttPlayerDb');

    this.version(1).stores({
      epg: '++, *chId',
    });
  }
}

export const db = new OttDataBase();
