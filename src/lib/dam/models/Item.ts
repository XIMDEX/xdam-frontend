/**
 * The item model used by the table component to show info about every single resource.
 */
export class Item {
  id: number;
  title: string;
  hash: string;
  size: string;
  type: string;
  image: string;
  constructor(id, tit?, h?, siz?, tp?, img?) {
    this.id = id;
    this.title = tit || '';
    this.hash = h || '';
    this.size = siz || '';
    this.type = tp || '';
    this.image = img || '';
  }
}
