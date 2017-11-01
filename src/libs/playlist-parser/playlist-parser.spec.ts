import { PlaylistParser, M3uTagParser, ExtTagParser } from './playlist-parser';

const playlistSrc = `
#EXTM3U url-epg="http://myott.tv/apid/" url-logo="http://myott.tv/images/"
#EXTINF:-1 tvg-id="131" tvg-logo="perviy.png" group-title="Общие" tvg-rec="1" ,Первый канал HD
http://myott.tv/stream/{KEY}/131.m3u8
#EXTINF:-1 tvg-id="137" tvg-logo="rossia1.png" group-title="Общие" tvg-rec="1" ,Россия HD
http://myott.tv/stream/{KEY}/137.m3u8
`;

const m3uLine = '#EXTM3U url-epg="http://myott.tv/apid/" url-logo="http://myott.tv/images/"';
const extLine = '#EXTINF:-1 tvg-id="131" tvg-logo="perviy.png" group-title="Общие" tvg-rec="1" ,Первый канал HD';

describe('PlaylistParser', () => {
  it('should return error if there no m3u tag', () => {
    expect(new PlaylistParser().parse('').errors.length).toBeTruthy();
  });

  it('should correctly parse general field', () => {
    const { playlist, errors } = new PlaylistParser().parse(playlistSrc);

    expect(errors.length).toBe(0);
    expect(playlist.urlEpg).toBe('http://myott.tv/apid/');
    expect(playlist.urlLogo).toBe('http://myott.tv/images/');
    expect(playlist.keyRequired).toBeTruthy();
  });

  it('should correctly fill channels', () => {
    const { playlist } = new PlaylistParser().parse(playlistSrc);

    const expectedChannel = {
      id: 131,
      name: 'Первый канал HD',
      logo: 'http://myott.tv/images/perviy.png',
      archive: true,
      groupTitle: 'Общие',
      stream: 'http://myott.tv/stream/{KEY}/131.m3u8',
    };

    expect(playlist.channels[0]).toEqual(expectedChannel);
  });

  describe('M3uTagParser', () => {
    it('should find m3u tag in a string', () => {
      expect(M3uTagParser.check(m3uLine)).toBeTruthy();
    });

    it('should not find anything in another line', () => {
      expect(M3uTagParser.check(extLine)).toBeFalsy();
    });

    it('should parse tag correctly', () => {
      const expected = [
        { key: 'url-epg', value: 'http://myott.tv/apid/' },
        { key: 'url-logo', value: 'http://myott.tv/images/' },
      ];

      expect(M3uTagParser.parse(m3uLine)).toEqual(expected);
    });
  });

  describe('ExtTagParser', () => {
    it('should find ext tag in a string', () => {
      expect(ExtTagParser.check(extLine)).toBeTruthy();
    });

    it('should not find anything in another line', () => {
      expect(ExtTagParser.check(m3uLine)).toBeFalsy();
    });

    it('should parse tag correctly', () => {
      const expected = [
        { key: 'tvg-id', value: '131' },
        { key: 'tvg-logo', value: 'perviy.png' },
        { key: 'group-title', value: 'Общие' },
        { key: 'tvg-rec', value: '1' },
        { key: 'channel-name', value: 'Первый канал HD' },
      ];

      expect(ExtTagParser.parse(extLine)).toEqual(expected);
    });
  });
});
