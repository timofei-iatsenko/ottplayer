import React, { PureComponent } from 'react';
import styles from './channel-epg.scss';
import { EpgEntry } from '../../entities/epg-entry';
import { Time } from '../formatters/time';
import { Duration } from '../formatters/duration';
import { DateFormatter } from '../formatters/date';

export interface StateProps {
  entries: EpgEntry[];
}

export interface OwnProps {
  channelId: number;
}

type Props = StateProps & OwnProps;

export class ChannelEpgComponent extends PureComponent<Props> {
  public render() {
    return (
      <div className={styles.host}>
        <div className={styles.entries}>

          {this.props.entries.map((entry) => (
            <div className={styles.entry} key={entry.startTime}>

              <div className={styles.mainInfo}>
                <h5 className={styles.name}>{entry.name}</h5>

                <div className={styles.timing}>
                  <div className={styles.startTime}><Time>{entry.startTime}</Time></div>
                  <div className={styles.endTime}><Time>{entry.endTime}</Time></div>
                </div>
              </div>

              <div className={styles.sideInfo}>
                <span className={styles.date}><DateFormatter>{entry.startTime}</DateFormatter></span>
                <span className={styles.duration}><Duration>{entry.duration}</Duration></span>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}
