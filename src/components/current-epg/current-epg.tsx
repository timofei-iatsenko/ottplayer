import { Component } from 'react';
import { EpgDictionary, EpgEntry } from '../../entities/epg-entry';

interface CurrentEpgProps {
  epgUrl: string;
  onDataReceived: (epg: EpgDictionary) => void;
}

export class CurrentEpg extends Component<CurrentEpgProps> {
  private isUnmounted = false;
  private scheduledTimeout: number = null;

  public componentWillMount() {
    this.updateEpg();
  }

  public componentWillUnmount() {
    this.isUnmounted = true;
    if (this.scheduledTimeout) {
      clearTimeout(this.scheduledTimeout);
    }
  }

  private updateEpg() {
    this.loadEpg().then(({epg, invalidateDate}) => {
      this.props.onDataReceived(epg);

      if (!this.isUnmounted) {
        this.scheduleNextUpdate(invalidateDate);
      }
    });
  }

  public loadEpg(): Promise<{epg: EpgDictionary, invalidateDate: number}> {
    const url = this.props.epgUrl;
    return window.fetch(url).then((r) => r.json()).then((response) => {
      let invalidateDate = 0;

      const epg =  Object.keys(response).reduce((acc, key) => {
        acc[key] = new EpgEntry(response[key]);
        invalidateDate = Math.max(invalidateDate, acc[key].endTime);
        return acc;
      }, {} as any);

      return { epg, invalidateDate };
    });
  }

  /**
   *
   * @param {number} when timestamp in *seconds*
   */
  private scheduleNextUpdate(when: number) {
    const currentTs = Math.floor(Date.now() / 1000);
    let timeout = when - currentTs;

    if (when <= currentTs) {
      timeout = 1000 * 10;
    }

    this.scheduledTimeout = window.setTimeout(this.updateEpg.bind(this),  timeout);
  }

  public render(): null {
    return null;
  }
}
