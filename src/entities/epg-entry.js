export class EpgEntry {
  constructor(data) {
    /**@number*/
    this.chId = +data.ch_id;
    /**@string*/
    this.name = data.name;
    /**@number*/
    this.time = data.time;
    /**@number*/
    this.timeTo = data.time_to;
    /**@number*/
    this.duration = +data.duration;
    /**@string*/
    this.descr = data.descr;
  }
}
