export class Asset {

    title: string;
    description: string;
    author: string;
    externalUrl: string;
    resource: File;
    extension: string;
    items: Object;
    type: string;
    category: string;
    license: Object;
    license_desc: string;

    constructor(
      title?: string,
      description?: string,
      author?: string,
      url?: string,
      resource?: File,
      extension?: string,
      items?: Object,
      type?: string
      ) {
      this.title = title || '';
      this.description = description || '';
      this.author = author || '';
      this.externalUrl = url || '';
      this.resource = resource || null;
      this.extension = extension || '';
      this.items = items || null;
      this.type = type || '';

    }
}
