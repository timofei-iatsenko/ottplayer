export class EpgEntry {
  public chId: number;
  public name: string;
  public startTime: number;
  public endTime: number;
  public duration: number;
  public descr: string;

  constructor(data: any) {
    this.chId = +data.ch_id;
    this.name = data.name;
    this.startTime = data.time;
    this.endTime = data.time_to;
    this.duration = +data.duration;
    this.descr = data.descr;
  }

  get inAir(): boolean {
    const currentTime = Date.now() / 1000;
    return this.startTime <= currentTime && this.endTime >= currentTime;
  }
}

export type EpgDictionary = { readonly [chid: number]: Readonly<EpgEntry> };
