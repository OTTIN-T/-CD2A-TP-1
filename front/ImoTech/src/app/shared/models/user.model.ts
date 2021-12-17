export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  admin: boolean;
  estateAgent: boolean;
  picture: string;

  constructor(user?: any) {
    user = user || {};
    this.id = user.id || 0;
    this.name = user.name || '';
    this.email = user.email || '';
    this.password = user.password || '';
    this.age = user.age || 0;
    this.phone = user.phone || '';
    this.admin = user.admin || false;
    this.estateAgent = user.estateAgent || false;
    this.picture = user.picture || '';
  }
}
