import React, { PureComponent } from 'react';
import styles from './channel-epg.scss';
import { ProgressBar } from '../progress-bar/progress-bar';
import { EpgEntry } from '../../entities/epg-entry';
import { Time } from '../formatters/time';
import Scrollbars from 'react-custom-scrollbars';
import { Duration } from '../formatters/duration';
import { DateFormatter } from '../formatters/date';

export interface DispatchProps {
  onStartDataSync: (channelId: number) => void;
  onStopDataSync: () => void;
}

export interface StateProps {
  entries: EpgEntry[];
}

export interface OwnProps {
  channelId: number;
}

type Props = StateProps & DispatchProps & OwnProps;

export class ChannelEpgComponent extends PureComponent<Props> {
  public componentDidMount() {
    this.props.onStartDataSync(this.props.channelId);
  }

  public componentWillReceiveProps(newProps: Props) {
    if (this.props.channelId !== newProps.channelId) {
      this.props.onStopDataSync();
      this.props.onStartDataSync(newProps.channelId);
    }
  }

  public componentWillUnmount() {
    this.props.onStopDataSync();
  }

  public render() {
    return (
      <div className={styles.host}>
        <Scrollbars autoHide>
          <div className={styles.entries}>

            {this.props.entries.map((entry) => (
              <div className={entry.inAir ? styles.entryActive : styles.entry} key={entry.startTime}>

                <div className={styles.mainInfo}>
                  <h5 className={styles.name}>{entry.name}</h5>

                  {entry.inAir && <ProgressBar startTime={entry.startTime} endTime={entry.endTime}/>}

                  {!entry.inAir && (
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
