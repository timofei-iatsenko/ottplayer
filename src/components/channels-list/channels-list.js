import React, { Component, PropTypes } from 'react';
import { Channel } from '../../entities/channel.model';
import './channels-list.scss';

export class ChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)),
  };

  render() {
    return (
      <div className="channels-list">
        {this.props.channels.map(
          /**
           * @param {Channel} channel
           */
          (channel) =>
          <button className="channels-list__item" onClick={() => this.props.onChangeChannel(channel)} key={channel.id}>
            <div className="channels-list__icon"><img src={channel.logo} alt=""/></div>
            <div className="channels-list__details">
              <h5 className="channels-list__name">{channel.name}</h5>
              <div className="channels-list__current-program"></div>
            </div>
          </button>
        )}
      </div>
    );
  }
}
