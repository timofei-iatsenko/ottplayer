import { ReadonlyChannelsCollection } from '../../entities/channel.model';
import { createGroup } from './create-group';

export function extractGroups(channels: ReadonlyChannelsCollection) {
  const grouped = channels.reduce((acc, channel) => {
    if (!acc.has(channel.groupTitle)) {
      return acc.set(channel.groupTitle, [channel.id]);
    }

    acc.get(channel.groupTitle).push(channel.id);
    return acc;
  }, new Map<string, number[]>());

  return Array.from(grouped.keys())
    .map((name) => createGroup(name, grouped.get(name)));
}
