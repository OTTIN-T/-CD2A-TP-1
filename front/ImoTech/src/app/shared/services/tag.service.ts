import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000/tags';

  getTags(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe({
        next: (tags) => resolve(tags),
        error: () => reject,
      });
    });
  }

  getTag(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/${id}`).subscribe({
        next: (tags) => resolve(tags),
        error: () => reject,
      });
    });
  }

  postTag(tag: Tag): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}`, tag).subscribe({
        next: (tag) => resolve(tag),
        error: (err) => reject(err),
      });
    });
  }

  putTag(id: number, tag: Tag): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}/${id}`, tag).subscribe({
        next: (tag) => resolve(tag),
        error: (err) => reject(err),
      });
    });
  }

  deleteTag(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}/${id}`).subscribe({
        next: (tag) => resolve(tag),
        error: (err) => reject(err),
      });
    });
  }
}
