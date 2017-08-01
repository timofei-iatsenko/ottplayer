import { slugify  } from 'transliteration';
export class Channel {
  constructor(data) {
    this.id = +data.id;
    this.name = data.name;
    this.logo = data.logo;
    this.archive = data.archive;
    this.stream = data.stream;
    this.groupTitle = data.groupTitle;
  }

  get urlSlug() {
    return slugify (this.id + '-' + this.name);
  }
}
