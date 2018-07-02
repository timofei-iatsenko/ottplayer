import { ReadonlyChannelsCollection } from './channel.model';

export interface Playlist {
  readonly urlEpg: string;
  readonly urlLogo: string;
  readonly channels: ReadonlyChannelsCollection;
}
