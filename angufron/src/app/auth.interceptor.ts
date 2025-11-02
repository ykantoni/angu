import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    let cloned = req;
    if (token) {
      const newHeaders = req.headers.set('X-My-Header', 'value');
      console.log(req.headers)
      console.log(newHeaders)
      let authReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer '+token )
      });
      authReq.headers.append('Authorization', 'Bearer '+token )
      return next.handle(authReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // simple global 401 handler: clear token and redirect to login
            this.auth.logout();
            location.href = '/login';
          }
          return throwError(() => err);
        })
      );
    }
    return next.handle(cloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // simple global 401 handler: clear token and redirect to login
          this.auth.logout();
          location.href = '/login';
        }
        return throwError(() => err);
      })
    );
  }
}
