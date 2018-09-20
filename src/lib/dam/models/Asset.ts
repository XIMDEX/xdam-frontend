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

    constructor(title?, desc?, aut?, url?, f?, ext?,  it?, ty?, cat?, lic?, lic_d?) {
      this.title = title || '';
      this.description = desc || '';
      this.author = aut || '';
      this.externalUrl = url || '';
      this.resource = f || null;
      this.extension = ext || '';
      this.items = it || null;
      this.type = ty || '';
      this.category = cat || '';
      this.license = lic || null;
      this.license_desc = lic_d || '';

    }
}
