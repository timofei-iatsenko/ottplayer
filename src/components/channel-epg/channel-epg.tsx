import React, { PureComponent } from 'react';
import { epgInAir } from '../../store/reducers/epg.reducer';
import styles from './channel-epg.scss';
import { ProgressBar } from '../progress-bar/progress-bar';
import { EpgEntry } from '../../entities/epg-entry';
import { Time } from '../formatters/time';
import Scrollbars from 'react-custom-scrollbars';
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
        <Scrollbars autoHide>
          <div className={styles.entries}>

            {this.props.entries.map((entry) => (
              <div className={epgInAir(entry) ? styles.entryActive : styles.entry} key={entry.startTime}>

                <div className={styles.mainInfo}>
                  <h5 className={styles.name}>{entry.name}</h5>

                  {epgInAir(entry) && <ProgressBar startTime={entry.startTime} endTime={entry.endTime}/>}

                  {!epgInAir(entry) && (
                    <div className={styles.timing}>
                      <div className={styles.startTime}><Time>{entry.startTime}</Time></div>
                      <div className={styles.endTime}><Time>{entry.endTime}</Time></div>
                    </div>
                  )}

                </div>

                <div className={styles.sideInfo}>
                  <span className={styles.date}><DateFormatter>{entry.startTime}</DateFormatter></span>
                  <span className={styles.duration}><Duration>{entry.duration}</Duration></span>
                </div>

              </div>
            ))}

          </div>
        </Scrollbars>
      </div>
    );
  }
}
