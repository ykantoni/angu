import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginReq { username: string; password: string }
interface LoginRes { token: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080';
  private key = 'jwt_token_v1';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<void> {
    return this.http.post<LoginRes>(`${this.api}/login`, { username, password })
      .pipe(
        tap(res => localStorage.setItem(this.key, res.token)),
        map(() => void 0)
      );
  }

  logout(): void { localStorage.removeItem(this.key); }

  getToken(): string | null { return localStorage.getItem(this.key); }

  isLoggedIn(): boolean { return !!this.getToken(); }
}
