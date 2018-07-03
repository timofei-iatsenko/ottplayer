import { Group } from '../reducers/channels.reducer';

export function createGroup(name: string, channels: Group['channels'] = []): Group {
  return {
    name,
    channels,
  };
}
