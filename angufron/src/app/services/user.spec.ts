import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {User2} from './user2';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  // add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  private apiAllUrl = 'http://localhost:8080/allusers';

  private apiByIdUrl = 'http://localhost:8080/userbyid';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiAllUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiByIdUrl}/${id}`);
  }


}
