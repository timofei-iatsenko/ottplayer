import React, { PureComponent } from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { Channel } from '../../../entities/channel.model';
import { EpgEntry } from '../../../entities/epg-entry';
import { AppState } from '../../../store';
import { epgInAir, selectChannelEpg } from '../../../store/reducers/epg.reducer';
import { Time } from '../../formatters/time';
import { ProgressBar } from '../../progress-bar/progress-bar';
import styles from './channels-detail.scss';

interface OwnProps {
  channel: Channel;
}

interface StateProps {
  epg: EpgEntry[];
}

type Props = OwnProps & StateProps;

class ChannelDetailComponent extends PureComponent<Props> {
  private timerId: number;

  private getEpg() {
    const current = this.props.epg.find(epgInAir);
    const currentIndex = this.props.epg.indexOf(current);

    let next: EpgEntry = null;

    if (currentIndex + 1 <= this.props.epg.length) {
      next = this.props.epg[currentIndex + 1];
    }
    return { current, next };
  }

  public componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState({time: Date.now()});
    }, 1000 * 5);
  }

  public componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  public render() {
    const epg = this.getEpg();

    return (<div className={styles.details}>
      <h5 title={this.props.channel.name} className={styles.name}>{this.props.channel.name}</h5>
      {epg.current && <div title={'Сейчас: ' + epg.current.name}
                           className={styles.currentProgram}>
        <span className={styles.time}><Time>{epg.current.startTime}</Time></span>
        {epg.current.name}
        </div>}
      {epg.current &&
      <ProgressBar startTime={epg.current.startTime} endTime={epg.current.endTime}/>
      }

      {epg.next &&
      <div title={'Далее: ' + epg.next.name} className={styles.nextProgram}>
        <span className={styles.time}><Time>{epg.next.startTime}</Time></span>
        {epg.next.name}
      </div>
      }
    </div>);
  }
}

const mapStateToProps: MapStateToPropsParam<StateProps, OwnProps, AppState> = (state: AppState, ownProps) => {
  return {
    epg: selectChannelEpg(state, ownProps.channel.id),
  };
};

export const ChannelDetail = connect<StateProps, {}, OwnProps>(
  mapStateToProps,
)(ChannelDetailComponent);
