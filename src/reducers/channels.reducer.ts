import { Channel } from '../entities/channel.model';
import { RECEIVE_CHANNELS } from '../actions/channels.actions';

export function channelsReducer(state: Channel[] = [], action: any) {
  switch (action.type) {
    case RECEIVE_CHANNELS:
     return action.channels;
    default:
      return state;
  }
}
