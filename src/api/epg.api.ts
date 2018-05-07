import { EpgDictionary, EpgEntry } from '../entities/epg-entry';

export type FetchEpgResponse = EpgDictionary;

export async function fetchEpg(epgUrl: string, channelIds: number[]): Promise<FetchEpgResponse> {
  const epg: EpgDictionary = {};
  const promises = channelIds.map((chid) => {
    return window.fetch(`${epgUrl}channel/${chid}`)
      .then((r) => r.json())
      .then((response) => {
        return Object.keys(response).map((key) => new EpgEntry(response[key]));
      })
      .then((entries: EpgEntry[]) => {
        epg[chid] = entries;
    });
  });

  return Promise.all(promises).then(() => epg);
}
