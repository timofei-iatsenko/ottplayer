export class Channel {
  public id: number;
  public name: string;
  public logo: string;
  public archive: string;
  public stream: string;
  public groupTitle: string;

  constructor(data: any) {
    this.id = +data.id;
    this.name = data.name;
    this.logo = data.logo;
    this.archive = data.archive;
    this.stream = data.stream;
    this.groupTitle = data.groupTitle;
  }

  get urlSlug() {
    return this.id;
  }
}
