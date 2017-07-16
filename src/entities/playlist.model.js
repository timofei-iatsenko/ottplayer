import { Channel } from './channel.model';

export class Playlist {
  constructor(data) {
    this.urlEpg = data.urlEpg;
    this.urlLogo = data.urlLogo;
    this.channels = data.channels.map((c) => {
      c.logo = this.urlLogo + c.logo;

      return new Channel(c)
    })
  }
}
