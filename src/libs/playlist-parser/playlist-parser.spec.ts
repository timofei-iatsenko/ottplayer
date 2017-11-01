const test = require('tape');
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

test('PlaylistParser', (t) => {
  t.ok(new PlaylistParser().parse('').errors.length, 'should return error if there no m3u tag');

  const { playlist, errors } = new PlaylistParser().parse(playlistSrc);

  t.ok(errors.length === 0, 'should not return error if there is m3u tag');
  t.equal(playlist.urlEpg, 'http://myott.tv/apid/');
  t.equal(playlist.urlLogo, 'http://myott.tv/images/');

  t.ok(playlist.keyRequired, 'Should require key');

  const expectedChannel = {
    id: '131',
    name: 'Первый канал HD',
    logo: 'perviy.png',
    archive: true,
    groupTitle: 'Общие',
    stream: 'http://myott.tv/stream/{KEY}/131.m3u8',
  };

  t.deepEqual(playlist.channels[0], expectedChannel);

  t.end();
});

test('M3uTagParser', (t) => {
  t.ok(M3uTagParser.check(m3uLine), 'should find m3u tag in a string');
  t.notOk(M3uTagParser.check(extLine), 'should not find anything in another line');

  const expected = [
    { key: 'url-epg', value: 'http://myott.tv/apid/' },
    { key: 'url-logo', value: 'http://myott.tv/images/' },
  ];

  t.deepLooseEqual(M3uTagParser.parse(m3uLine), expected, 'should parse correctly');
  t.end();
});

test('ExtTagParser', (t) => {
  t.ok(ExtTagParser.check(extLine), 'should find ext tag in a string');
  t.notOk(ExtTagParser.check(m3uLine), 'should not find anything in another line');

  const expected = [
    { key: 'tvg-id', value: '131' },
    { key: 'tvg-logo', value: 'perviy.png' },
    { key: 'group-title', value: 'Общие' },
    { key: 'tvg-rec', value: '1' },
    { key: 'channel-name', value: 'Первый канал HD' },
  ];

  t.deepLooseEqual(ExtTagParser.parse(extLine), expected, 'should parse correctly');
  t.end();
});
