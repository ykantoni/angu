import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';

import { AuthGuardClass } from './auth.guard';


export const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardClass] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];


