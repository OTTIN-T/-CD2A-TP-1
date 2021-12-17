export class Tag {
  id: number;
  name: string;

  constructor(tag?: any) {
    tag = tag || {};
    this.id = tag.id || 0;
    this.name = tag.name || '';
  }
}
