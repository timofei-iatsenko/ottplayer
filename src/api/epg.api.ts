import { EpgDictionary, EpgEntry } from '../entities/epg-entry';

function getTimeFromNow(seconds: number): number {
  return Math.floor((Date.now() / 1000) + seconds);
}

function programInAir(entry: EpgEntry) {
  const currentTime = Date.now() / 1000;
  return entry.startTime <= currentTime && entry.endTime >= currentTime;
}

export interface CurrentEpgResponse {
  epg: EpgDictionary;
  invalidateDate: number;
}
export async function fetchCurrentEpg(url: string): Promise<CurrentEpgResponse> {
  return window.fetch(url)
    .then((r) => r.json())
    .then((response: any) => {
      let invalidateDate = getTimeFromNow(5);

      const epg: EpgDictionary = Object.keys(response).reduce((acc, key) => {
        acc[key] = new EpgEntry(response[key]);
        invalidateDate = Math.min(invalidateDate, acc[key].endTime);
        return acc;
      }, {} as any);

      return {epg, invalidateDate};
    });
}

export interface ChannelEpgResponse {
  epg: EpgEntry[];
  invalidateDate: number;
}
export async function fetchChannelEpg(epgUrl: string): Promise<ChannelEpgResponse> {
  return window.fetch(epgUrl)
    .then((r) => r.json())
    .then((response) => {
      const epg = Object.keys(response).reduce((acc, key) => {
        acc.push(new EpgEntry(response[key]));
        return acc;
      }, [] as EpgEntry[]);

      const invalidateDate = epg.find(programInAir).endTime;
      // const invalidateDate = getTimeFromNow(3);

      return {epg, invalidateDate};
    });
}
