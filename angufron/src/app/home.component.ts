import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from './services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <h2>Protected Home</h2>
      <p *ngIf="greeting">Greeting: {{ greeting }}</p>
      <p *ngIf="!greeting && !error">Loading greeting...</p>
      <div *ngIf="error" style="color:#c00">{{ error }}</div>

      <h3>Users</h3>
      <div *ngIf="loadingUsers">Loading users...</div>
      <ul *ngIf="!loadingUsers && users.length">
        <li *ngFor="let u of users">
          {{ u.id }} — {{ u.username }} — {{ u.email }} — {{ u.role }}
        </li>
      </ul>
    </div>
  `
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  greeting = '';
  loadingUsers = false;
  error = '';
  title = signal('angular-app');

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getGreeting().subscribe({
      next: txt => (this.greeting = txt),
      error: () => (this.error = 'Failed to load greeting')
    });
    this.fetchUsers();
  }

  fetchUsers() {
    this.loadingUsers = true;
    this.userService.getAll().subscribe({
      next: u => {
        this.users = u;
        this.loadingUsers = false;
      },
      error: () => {
        this.error = 'Could not load users';
        this.loadingUsers = false;
      }
    });
  }
}