import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../store';
import Cast from 'react-icons/lib/md/cast';
import CastConnected from 'react-icons/lib/md/cast-connected';
import styles from './cast-button.scss';
import autobind from 'autobind-decorator';

export interface StateProps {
  castState: cast.framework.CastState;
}

type Props = StateProps;

export class CastButtonComponent extends PureComponent<Props> {
  private isConnected(): boolean {
    return this.props.castState === 'CONNECTED';
  }

  @autobind
  private requestCastSession() {
    const context = cast.framework.CastContext.getInstance();
    context.requestSession();
  }

  public render() {
    return <button className={this.isConnected() ? styles.active : styles.default}
            onClick={this.requestCastSession}
            title='Cast to...'
            type='button'>
      {this.isConnected() ? <CastConnected/> : <Cast/> }
    </button>;
  }
}

const mapStateToProps = (state: AppState): Props => {
  return {
    castState: state.casting.castState,
  };
};

export const CastButton = connect<StateProps>(
  mapStateToProps,
)(CastButtonComponent);
