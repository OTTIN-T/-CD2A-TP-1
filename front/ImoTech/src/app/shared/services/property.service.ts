import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  url: string = 'http://localhost:3000/properties';
  constructor(private http: HttpClient) {}

  getProperties(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe({
        next: (properties) => resolve(properties),
        error: () => reject,
      });
    });
  }

  getProperty(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/${id}`).subscribe({
        next: (property) => resolve(property),
        error: () => reject,
      });
    });
  }

  postProperty(property: Property): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}`, property).subscribe({
        next: (property) => resolve(property),
        error: (err) => reject(err),
      });
    });
  }

  putProperty(id: number, property: Property): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.url}/${id}`, property).subscribe({
        next: (property) => resolve(property),
        error: (err) => reject(err),
      });
    });
  }

  deleteProperty(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}/${id}`).subscribe({
        next: (property) => resolve(property),
        error: (err) => reject(err),
      });
    });
  }
}
