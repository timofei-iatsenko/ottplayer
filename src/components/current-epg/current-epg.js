import { Component } from 'react';
import PropTypes from 'prop-types';
import { EpgEntry } from '../../entities/epg-entry';

export class CurrentEpg extends Component {
  static propTypes = {
    epgUrl: PropTypes.string.isRequired,
    onDataReceived: PropTypes.func.isRequired,
  };

  state = {
    epg: {},
  };

  scheduledTimeout = null;

  componentWillMount() {
    this.updateEpg();
  }

  componentWillUnmount() {
    if (this.scheduledTimeout) {
      clearTimeout(this.scheduledTimeout);
    }
  }

  updateEpg() {
    this.loadEpg().then(({epg, invalidateDate}) =>{
      this.props.onDataReceived(epg);

      if (this.isMounted) {
        this.scheduleNextUpdate(invalidateDate);
      }

    })
  }

  /**
   * @returns {Promise.<{epg, invalidateDate}>}
   */
  loadEpg() {
    const url = this.props.epgUrl;
    return window.fetch(url).then(r => r.json()).then((response) => {
      let invalidateDate = 0;

      const epg =  Object.keys(response).reduce((acc, key) => {
        acc[key] = new EpgEntry(response[key]);
        invalidateDate = Math.max(invalidateDate, acc[key].timeTo);
        return acc;
      }, {});

      return { epg, invalidateDate };
    });
  }

  /**
   *
   * @param {number} when timestamp in *seconds*
   */
  scheduleNextUpdate(when) {
    const currentTs = Math.floor(Date.now() / 1000);
    let timeout = when - currentTs;

    if (when <= currentTs) {
      timeout = 1000 * 10;
    }

    this.scheduledTimeout = setTimeout(this.updateEpg,  timeout);
  }

  render() {
    return null;
  }
}
