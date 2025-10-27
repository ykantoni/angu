// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/api/auth';
  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/login`, { username, password })
      .pipe(tap(res => { if (res?.token) localStorage.setItem('jwt', res.token); }));
  }
  logout() { localStorage.removeItem('jwt'); }
  getToken() { return localStorage.getItem('jwt'); }
  isLoggedIn() { return !!this.getToken(); }
}
