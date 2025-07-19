import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  searchTerm: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  onSearchChange() {
    if (this.searchTerm.trim().length > 2) {
      this.fetchResults();
    } else {
      this.searchResults = [];
    }
  }

  onSearchClick() {
    if (this.searchTerm.trim()) {
      this.fetchResults();
    }
  }

  fetchResults() {
    const params = new HttpParams()
      .set('fullName', this.searchTerm)
      .set('eMail', this.searchTerm);

    this.http
      .get<any[]>('http://localhost:8080/usercontroller/search', { params })
      .subscribe({
        next: (data) => (this.searchResults = data),
        error: (err) => console.error('Search failed', err),
      });
  }

  goToProfile(user: any) {
    console.log('Navigating to user: ', user);
    if (user.id) {
      this.router.navigate(['/profile', user.id]);
    } else {
      console.warn('User ID is missing: ', user);
    }
  }
}
