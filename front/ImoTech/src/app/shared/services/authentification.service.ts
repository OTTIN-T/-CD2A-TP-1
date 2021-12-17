import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  loginUser(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/users/login', user).subscribe({
        next: (token: any) => {
          localStorage.setItem('auth', token.token);
          resolve(token);
        },
        error: () => reject,
      });
    });
  }
}
