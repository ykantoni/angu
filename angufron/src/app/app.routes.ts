import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];


