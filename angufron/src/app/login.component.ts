import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:420px;margin:2rem auto">
      <h2>Login</h2>
      <form (ngSubmit)="submit()" #f="ngForm">
        <div style="margin-bottom:.5rem">
          <label>Username</label><br/>
          <input name="username" [(ngModel)]="username" required />
        </div>
        <div style="margin-bottom:.5rem">
          <label>Password</label><br/>
          <input type="password" name="password" [(ngModel)]="password" required />
        </div>
        <div *ngIf="error" style="color:#a00;margin-bottom:.5rem">{{ error }}</div>
        <button type="submit">Login</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = null;
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = err?.error?.message || 'Login failed'
    });
  }
}
