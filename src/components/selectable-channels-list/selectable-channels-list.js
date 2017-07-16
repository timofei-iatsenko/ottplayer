import React, { Component, PropTypes } from 'react';
import { Channel } from '../../entities/channel.model';
import './selectable-channels-list.scss';

export class SelectableChannelsList extends Component {
  static propTypes = {
    onChangeChannel: PropTypes.func.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
    channels: PropTypes.arrayOf(PropTypes.instanceOf(Channel)).isRequired,
  };

  render() {
    //
    return (
      <div className="channels-list">
        {this.props.channels.map(
          /**
           * @param {Channel} channel
           */
          (channel) =>
          <div className="channels-list__item" onClick={() => this.props.onChangeChannel(channel)} key={channel.id}>
            <div className="channels-list__checkbox">
              <input type="checkbox" id={`channel${channel.id}`}/>
              <label onClick={(e) => e.stopPropagation()} htmlFor={`channel${channel.id}`}>Select</label>
            </div>
            <div className="channels-list__icon"><img src={channel.logo} alt=""/></div>
            <div className="channels-list__details">
              <h5 className="channels-list__name">{channel.name}</h5>
              <div className="channels-list__current-program"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
