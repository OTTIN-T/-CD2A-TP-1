import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe({
        next: (users) => resolve(users),
        error: () => reject,
      });
    });
  }

  getUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/${id}`).subscribe({
        next: (users) => resolve(users),
        error: () => reject,
      });
    });
  }

  postUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}`, user).subscribe({
        next: (user) => resolve(user),
        error: (err) => reject(err),
      });
    });
  }

  putUser(id: number, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}/${id}`, user).subscribe({
        next: (user) => resolve(user),
        error: (err) => reject(err),
      });
    });
  }

  deleteUser(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}/${id}`).subscribe({
        next: (user) => resolve(user),
        error: (err) => reject(err),
      });
    });
  }
}
