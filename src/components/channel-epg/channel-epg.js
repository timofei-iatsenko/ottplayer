import React, { Component } from 'react';
import styles from './channel-epg.scss';
import PropTypes from 'prop-types';
import { ProgressBar } from '../progress-bar/progress-bar';
import { EpgEntry } from '../../entities/epg-entry';
import { Time } from '../formatters/time';
import { Scrollbars } from 'react-custom-scrollbars';
import { Duration } from '../formatters/duration';
import { DateFormatter } from '../formatters/date';

export class ChannelEpg extends Component {
    static propTypes = {
      epgUrl: PropTypes.string.isRequired
    };

    state = {
      /**
       * @type EpgEntry[]
       */
      entries: []
    };

    componentWillReceiveProps(props) {
      this.loadEpg(props.epgUrl).then((entries) => {
        this.setState({entries})
      })
    }

  /**
   * @param {string} url
   * @returns {Promise.<EpgEntry[]>}
   */
  loadEpg(url) {
    return window.fetch(url).then(r => r.json()).then((response) => {
      return Object.keys(response).reduce((acc, key) => {
        acc.push(new EpgEntry(response[key]));
        return acc;
      }, []);
    });
  }

  render() {
    return (
      <div className={styles.host}>
        <Scrollbars autoHide>
          <div className={styles.entries}>

            {this.state.entries.map((entry) => (
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
        </Scrollbars>
      </div>
    );
  }
}
