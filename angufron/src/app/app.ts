import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.spec';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<h1>{{ message }}</h1>',
  styleUrl: './app.css'
})
export class App implements OnInit {
  message: string = 'hoho';
  protected readonly title = signal('angular-app');
  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.message = data);
  }
}
