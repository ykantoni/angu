import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { KeycloakService } from './services/keycloak.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  async canActivate(): Promise<boolean> {
    if (KeycloakService.isLoggedIn()) return true;
    await KeycloakService.login();
    return false; // navigation will occur after login redirect back
  }
}