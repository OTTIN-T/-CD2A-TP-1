import { Tag } from './tag.model';

export class Property {
  id: number;
  title: string;
  picture: string;
  address: string;
  price: number;
  sector: string;
  room: number;
  description: string;
  advantage: string;
  Tags: Tag[];
  UserId: number;

  constructor(property?: any) {
    property = property || {};
    this.id = property.id || 0;
    this.title = property.title || '';
    this.picture = property.picture || '';
    this.address = property.address || '';
    this.price = property.price || 0;
    this.sector = property.sector || '';
    this.room = property.room || false;
    this.description = property.description || false;
    this.advantage = property.advantage || '';
    this.Tags = property.Tags || [];
    this.UserId = property.UserId || 0;
  }
}
