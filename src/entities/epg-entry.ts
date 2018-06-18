export interface EpgEntry {
  chId: number;
  name: string;
  startTime: number;
  endTime: number;
  duration: number;
  descr: string;
}

export type EpgDictionary = { [chid: number]: EpgEntry[] };
