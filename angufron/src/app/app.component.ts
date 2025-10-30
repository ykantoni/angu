import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <nav style="display:flex;gap:1rem;padding:1rem;border-bottom:1px solid #eee">
      <a routerLink="/">Home</a>
      <a routerLink="/login" *ngIf="!auth.isLoggedIn()">Login</a>
      <button *ngIf="auth.isLoggedIn()" (click)="logout()">Logout</button>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  logout() {
    this.auth.logout();
    location.href = '/login';
  }
}
