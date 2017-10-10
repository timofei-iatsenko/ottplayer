import { Channel } from './channel.model';

export class Playlist {
  public urlEpg: string;
  public urlLogo: string;
  // public channels: Channel[];

  constructor(data: any) {
    this.urlEpg = data.urlEpg;
    this.urlLogo = data.urlLogo;
    // this.channels = data.channels.map((c: any) => {
    //   c.logo = this.urlLogo + c.logo;
    //
    //   return new Channel(c);
    // });
  }
}
