import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

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
      .get<any[]>(`${environment.apiUrlUser}/search`, { params })
      .subscribe({
        next: (data) => (this.searchResults = data),
        error: (err) => console.error('Search failed', err),
      });
  }

  goToProfile(user: any) {
    if (user.id) {
      this.router.navigate(['/profile', user.id]);
    }
  }

  onGetStartedClick() {
    if (this.isLoggedIn) {
      this.router.navigate(['/create-portfolio']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
