import React, { PureComponent, SyntheticEvent } from 'react';
import styles from './settings.scss';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { changeSettings } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers/settings.reducer';
import {RouteComponentProps} from 'react-router';

interface Props {
  playlistUrl: string;
  currentKey: string;
  onSubmit: (data: SettingsState) => void;
  onCancel: () => void;
}

export class SettingsComponent extends PureComponent<Props> {
  private playlistInput: HTMLInputElement;
  private keyInput: HTMLInputElement;

  @autobind
  private handleSubmit($event: SyntheticEvent<HTMLFormElement>) {
    $event.preventDefault();

    this.props.onSubmit({
      playlistUrl: this.playlistInput.value,
      currentKey: this.keyInput.value,
    });
  }

  @autobind
  private handleCancel() {
    this.props.onCancel();
  }

  public render() {
    return (
      <div className={styles.host}>
        <h2 className={styles.title}>Settings</h2>

        <form onSubmit={this.handleSubmit} className={styles.gridForm}>
          <label className={styles.blockField}>
            <input ref={(inp) => this.playlistInput = inp}
                   defaultValue={this.props.playlistUrl}
                   type='text' name='playlist-url'></input>
            <span className={styles.fieldLabel}>Playlist Url</span>
          </label>

          <label className={styles.blockField}>
            <input ref={(inp) => this.keyInput = inp}
                   defaultValue={this.props.currentKey}
                   type='text' name='auth-key'></input>
            <span className={styles.fieldLabel}>Key</span>
          </label>

          <div className={styles.formActions}>
            <button className={styles.submitBtn}
                    type='submit'>Save</button>
            <button className={styles.cancelBtn}
                    onClick={this.handleCancel}
                    type='button'>Cancel</button>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state: AppState): Partial<Props> {
  return state.settings;
}

function mapDispatchToProps(dispatch: Dispatch<AppState>, ownProps: RouteComponentProps<{}>): Partial<Props>  {
  return {
    onSubmit: (data) => {
      dispatch(changeSettings(data));
      ownProps.history.push('/');
    },
    onCancel: () => ownProps.history.push('/'),
};
}

export const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
