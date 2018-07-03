import { EpgEntry } from '../entities/epg-entry';

export type FetchEpgResponse = EpgEntry[];

function normalizeEpgEntry(data: any): EpgEntry {
  return {
    chId: +data.ch_id,
    name: data.name,
    startTime: data.time,
    endTime: data.time_to,
    duration: +data.duration,
    descr: data.descr,
  };
}

export async function fetchEpg(epgUrl: string, channelIds: number[]): Promise<FetchEpgResponse> {
  const epg: EpgEntry[] = [];
  const promises = channelIds.map((chid) => {
    return window.fetch(`${epgUrl}channel/${chid}`)
      .then((r) => r.json())
      .then((response) => {
        return Object.keys(response)
          .forEach((key) => epg.push(normalizeEpgEntry(response[key])));
      });
  });

  return Promise.all(promises).then(() => epg);
}
