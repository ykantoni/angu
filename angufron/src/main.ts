import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/auth.interceptor';
import { AuthGuard } from './app/auth.guard';
import { KeycloakService } from './app/services/keycloak.service';
import { environment } from './app/environment';

async function appBootstrap() {
  await KeycloakService.init({
    url: environment.keycloak.url,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId
  });

  await bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes),
      importProvidersFrom(HttpClientModule),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      AuthGuard
    ]
  });
}

appBootstrap();