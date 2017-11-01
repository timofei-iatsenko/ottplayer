import { PlaylistParser } from '../libs/playlist-parser/playlist-parser';
import { Playlist } from '../entities/playlist.model';

export function fetchPlaylist(url: string): Promise<Playlist> {
  return window.fetch(`http://${url}/ottplayer/playlist.m3u`)
    .then((r) => r.text())
    .then((rawPlaylist: string) => {
      const parsed = new PlaylistParser().parse(rawPlaylist);

      if (parsed.errors.length) {
        throw new Error(parsed.errors[0]);
      }

      return parsed.playlist as Playlist;
    });
}
