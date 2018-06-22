import React, { PureComponent, MouseEvent, ReactFragment } from 'react';
import autobind from 'autobind-decorator';
import { Channel } from '../../entities/channel.model';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  channel: Channel;
  children: ReactFragment;
}

export class ChannelLink extends PureComponent<Props> {
  public static contextTypes = {
    router: () => { /**/ },
  };

  private getChannelSlug(channel: Channel) {
    return channel.id;
  }

  @autobind
  private handleClick(event: MouseEvent) {
    event.preventDefault();
    const history = this.context.router.history;
    history.push('/' + this.getChannelSlug(this.props.channel));
  }

  public render() {
    const { channel, ...props } = this.props;

    return (
      <button type='button' {...props} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
