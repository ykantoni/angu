// (Rename from user.service.ts; .spec.ts is usually for tests.)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = environment.apiBase;
  constructor(private http: HttpClient) {}

  getGreeting(): Observable<string> {
    return this.http.get(`${this.base}/users`, { responseType: 'text' });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/allusers`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/userbyid/${id}`);
  }
}
