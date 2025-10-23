import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  id?: bigint;
  name!: string;
  email!: string;
}
