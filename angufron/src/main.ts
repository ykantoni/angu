import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './app/services/token.interceptor';
import { App } from './app/app';

bootstrapApplication(App, {
providers: [
  provideHttpClient(),
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
],
}).catch((err) => console.error(err));
