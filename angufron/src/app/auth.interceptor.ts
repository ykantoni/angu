import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeycloakService } from './services/keycloak.service';
import { environment } from './environment';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private isKeycloakUrl(url: string): boolean {
    const base = environment.keycloak.url.replace(/\/+$/, '');
    return url.startsWith(base);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip if not our API or is Keycloak endpoints (avoid leaking token unnecessarily)
    const shouldAttach =
      !this.isKeycloakUrl(req.url) &&
      (req.url.startsWith(environment.apiBase) || /^[./]/.test(req.url));

    if (!shouldAttach) {
      return next.handle(req);
    }

    return from(KeycloakService.updateToken(30)).pipe(
      switchMap(() => {
        const token = KeycloakService.getToken();
        if (token) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
        }
        return next.handle(req);
      })
    );
  }
}