export class Asset {

    title: string;

    description: string;

    author: string;

    externalUrl: string;

    resource: File;

    extension: string;
    constructor(title, desc, aut, url, f, ext) {
      this.title = title;
      this.description = desc;
      this.author = aut;
      this.externalUrl = url;
      this.resource = f;
      this.extension = ext;
    }
}
