export interface Channel {
  id: number;
  name: string;
  logo: string;
  archive: boolean;
  stream: string;
  groupTitle: string;
}

export type ReadonlyChannelsCollection = ReadonlyArray<Readonly<Channel>>;
