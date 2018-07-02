import React, { PureComponent, MouseEvent, ReactFragment } from 'react';
import autobind from 'autobind-decorator';
import { Channel } from '../../entities/channel.model';
import { connect, Dispatch } from 'react-redux';
import { ToggleMainPanel } from '../../store/actions/ui.actions';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  channel: Channel;
  children: ReactFragment;
  onClick: () => void;
}

export class ChannelLinkComponent extends PureComponent<Props> {
  public static contextTypes = {
    router: (() => { /**/ }) as any,
  };

  private getChannelSlug(channel: Channel) {
    return channel.id;
  }

  @autobind
  private handleClick(event: MouseEvent) {
    event.preventDefault();
    const history = this.context.router.history;
    history.push('/' + this.getChannelSlug(this.props.channel));
    this.props.onClick();
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

export const ChannelLink = connect(
  null as () => {},
  (dispatch: Dispatch): Partial<Props>  => ({
    onClick: () => dispatch(new ToggleMainPanel({visible: true})),
  }),
)(ChannelLinkComponent);
