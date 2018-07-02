interface KeyValuePair {
  key: string;
  value: string;
}

type ParsingResult = { errors: string[], playlist: ParsedPlaylist };

export class PlaylistParser {
  private errors: string[] = [];
  private result = new ResultBuilder();

  public parse(data: string): ParsingResult {
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
      playlist: this.result.getResult(),
    };
  }

  private throwError(error: string): ParsingResult {
    this.errors.push(error);
    return {
      errors: this.errors,
      playlist: null,
    };
  }

  private parseLine(string: string, index: number) {
    if (index === 0 && M3uTagParser.check(string)) {
      const global = this.mapKeyValue(M3uTagParser.parse(string));
      this.result.setGlobalData(global);
    } else if (ExtTagParser.check(string)) {
      const ext = this.mapKeyValue(ExtTagParser.parse(string));
      this.result.addChannel(ext);
    } else {
      this.result.setChannelStream(string);
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
  id: number;
  name: string;
  logo: string;
  archive: boolean;
  groupTitle: string;
  stream: string;
}

interface ParsedPlaylist {
  urlEpg: string;
  urlLogo: string;
  keyRequired: boolean;
  channels: ParsedChannel[];
}

class ResultBuilder {
  private data: ParsedPlaylist = {
    urlEpg: null,
    urlLogo: null,
    keyRequired: null,
    channels: [],
  };

  public getResult(): ParsedPlaylist {
    return this.data;
  }

  public setGlobalData(data: any) {
    this.data.urlEpg = data['url-epg'];
    this.data.urlLogo = data['url-logo'];
  }

  public addChannel(data: any) {
    this.data.channels.push({
      id: +data['tvg-id'],
      name: data['channel-name'],
      logo: this.data.urlLogo + data['tvg-logo'],
      archive: data['tvg-rec'] === '1',
      groupTitle: data['group-title'],
      stream: null,
    });
  }

  public setChannelStream(streamUrl: string) {
    if (!this.data.keyRequired) {
      this.data.keyRequired = streamUrl.indexOf('{KEY}') !== -1;
    }

    this.data.channels[this.data.channels.length - 1].stream = streamUrl;
  }
}
