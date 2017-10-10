export interface Channel {
  id: number;
  name: string;
  logo: string;
  archive: string;
  stream: string;
  groupTitle: string;
}

export type ChannelsCollection = ReadonlyArray<Readonly<Channel>>;
