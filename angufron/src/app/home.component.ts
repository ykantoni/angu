import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <h2>Protected Home</h2>
      <p *ngIf="message">Server: {{ message }}</p>
      <p *ngIf="!message">Loading...</p>
    </div>
  `
})
export class HomeComponent implements OnInit {
  message: string | null = null;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<{ message: string }>('http://localhost:8080/api/protected')
      .subscribe({
        next: res => this.message = res.message,
        error: () => this.message = 'Could not load protected resource'
      });
  }
}
