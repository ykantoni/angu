import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KeycloakService } from './services/keycloak.service';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, JsonPipe],
  template: `
    <header style="padding:0.5rem; background:#222; color:#fff; display:flex; gap:1rem; align-items:center">
      <span>Angular + Keycloak Demo</span>
      <span *ngIf="loggedIn">User: {{ username }}</span>
      <button (click)="login()" *ngIf="!loggedIn">Login</button>
      <button (click)="logout()" *ngIf="loggedIn">Logout</button>
      <button (click)="refresh()" *ngIf="loggedIn">Manual Refresh</button>
    </header>
    <router-outlet></router-outlet>
    <section style="padding:1rem">
      <h4 *ngIf="token">Access Token (truncated)</h4>
      <code *ngIf="token">{{ token.slice(0,80) }}...</code>
    </section>
  `
})
export class AppComponent implements OnInit {
  loggedIn = false;
  username = '';
  token = '';
  roles: string[] = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.loggedIn = KeycloakService.isLoggedIn();
    if (this.loggedIn) {
      const profile = await KeycloakService.loadUserProfile();
      this.username = profile?.username || profile?.firstName || '';
      this.token = KeycloakService.getToken() || '';
      this.roles = await KeycloakService.getUserRoles();
      // periodic refresh tick
      setInterval(() => KeycloakService.updateToken(60), 60_000);
    }
  }

  login() { KeycloakService.login(); }
  logout() { KeycloakService.logout(); }
  async refresh() {
    await KeycloakService.updateToken(70);
    this.token = KeycloakService.getToken() || '';
  }
}
