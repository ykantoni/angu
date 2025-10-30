import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {User, UserService} from './services/user.spec';
import {NgFor, NgIf} from '@angular/common';
import { LoginComponent } from './login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgFor, LoginComponent],
  template: `
    <!-- src/app/components/user-list/user-list.component.html -->
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>
    <ul *ngIf="!loading && users.length">
      <li *ngFor="let u of users">{{ u.id }} — {{ u.username }} — {{ u.email }}</li>
    </ul>

    <section class="content">
      <app-login></app-login>
    </section>
  `,
  styleUrl: './app.css'
})
export class App implements OnInit {

  users: User[] = [];
  loading = false;
  error = '';

  message: string = 'hoho';
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
