import {Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import {User, UserService} from './services/user.spec';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <h2>Protected Home</h2>
      <p *ngIf="message">Server: {{ message }}</p>
      <p *ngIf="!message">Loading...</p>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error">{{ error }}</div>
      <ul *ngIf="!loading && users.length">
        <li *ngFor="let u of users">{{ u.id }} — {{ u.username }} — {{ u.email }}</li>
      </ul>
    </div>
  `
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  message: string | null = null;
  protected readonly title = signal('angular-app');

  constructor(private userService: UserService) {}

  ngOnInit2() {
    this.userService.getUsers().subscribe(data => this.message = data);
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.error = '';
    this.userService.getAll().subscribe({
      next: u => { this.users = u; this.loading = false; },
      error: err => { this.error = 'Could not load users'; this.loading = false; }
    });
  }
}
