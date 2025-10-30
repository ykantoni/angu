// login.component.ts (simplified)
import { Component } from '@angular/core';
import { AuthService } from './services/auth.spec';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  template: `
    <section>
    <form (submit)="submit()">
      <input [(ngModel)]="username" name="username" required/>
      <input [(ngModel)]="password" name="password" type="password" required/>
      <button type="submit">Login</button>
    </form>
    </section>`

})
export class LoginComponent {
  username = ''; password = '';
  constructor(private auth: AuthService, private router: Router) {}
  submit() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Login failed')
    });
  }
}
