interface KeyValuePair {
  key: string;
  value: string;
}

export class PlaylistParser {
  private errors: string[] = [];
  public playlist = new ParseResult();

  public parse(data: string) {
    if (!data) {
      return this.throwError('no data specified');
    }
    data = data.trim();
    if (!M3uTagParser.check(data)) {
      return this.throwError('Playlist file should starts from #EXTM3U tag');
    }

    data
      .match(/[^\r\n]+/g)
      .forEach(this.parseLine.bind(this));

    return {
      errors: this.errors,
      playlist: this.playlist,
    };
  }

  private throwError(error: string) {
    this.errors.push(error);
    return {
      errors: this.errors,
      playlist: this.playlist,
    };
  }

  private parseLine(string: string, index: number) {
    if (index === 0 && M3uTagParser.check(string)) {
      const global = this.mapKeyValue(M3uTagParser.parse(string));
      this.playlist.setGlobalData(global);
    } else if (ExtTagParser.check(string)) {
      const ext = this.mapKeyValue(ExtTagParser.parse(string));
      this.playlist.addChannel(ext);
    } else {
      this.playlist.setChannelStream(string);
    }
  }

  private mapKeyValue(array: KeyValuePair[]) {
    return array.reduce((acc, entry) => {
      const { key, value } = entry;
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });
  }
}

export class M3uTagParser {
  public static check(string: string): boolean {
    return string.indexOf('#EXTM3U') === 0;
  }

  public static parse(line: string): KeyValuePair[] {
    return line.match(/([a-z-]+)="(.+?)"/g).map((string) => {
      const [key, value] = string.replace(/"/g, '').split('=');
      return { key, value };
    });
  }
}

export class ExtTagParser {
  public static check(string: string): boolean {
    return string.indexOf('#EXTINF') === 0;
  }

  public static parse(line: string): KeyValuePair[] {
    const params = M3uTagParser.parse(line);
    params.push({ key: 'channel-name', value: line.match(/,\s?(.+)/)[1] });
    return params;
  }
}

interface ParsedChannel {
  id: string;
  name: string;
  logo: string;
  archive: boolean;
  groupTitle: string;
  stream: string;
}

class ParseResult {
  public urlEpg: string = null;
  public urlLogo: string = null;
  public keyRequired = false;
  public channels: ParsedChannel[] = [];

  public setGlobalData(data: any) {
    this.urlEpg = data['url-epg'];
    this.urlLogo = data['url-logo'];
  }

  public addChannel(data: any) {
    this.channels.push({
      id: data['tvg-id'],
      name: data['channel-name'],
      logo: data['tvg-logo'],
      archive: data['tvg-rec'] === '1',
      groupTitle: data['group-title'],
      stream: null,
    });
  }

  public setChannelStream(streamUrl: string) {
    if (!this.keyRequired) {
      this.keyRequired = streamUrl.indexOf('{KEY}') !== -1;
    }

    this.channels[this.channels.length - 1].stream = streamUrl;
  }
}
