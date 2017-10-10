import { Channel } from './channel.model';

export interface Playlist {
  urlEpg: string;
  urlLogo: string;
  channels: Channel[];
}
