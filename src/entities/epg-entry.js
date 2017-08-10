export class EpgEntry {
  constructor(data) {
    /**@number*/
    this.chId = +data.ch_id;
    /**@string*/
    this.name = data.name;
    /**@number*/
    this.startTime = data.time;
    /**@number*/
    this.endTime = data.time_to;
    /**@number*/
    this.duration = +data.duration;
    /**@string*/
    this.descr = data.descr;
  }

  /**
   *
   * @returns {boolean}
   */
  get inAir() {
    const currentTime = new Date() / 1000;
    return this.startTime <= currentTime && this.endTime >= currentTime;
  }

}
