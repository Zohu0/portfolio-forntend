import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  confirmLogout(event: Event) {

    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }

  logout() {
    // Remove token or user data from localStorage/sessionStorage
    localStorage.removeItem('token'); // Adjust key based on your app
    // You can also clear everything: localStorage.clear();

    // Redirect to home page
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // or sessionStorage, depending on where you store the token
  }

  handleCreatePortfolioClick(event: Event) {
    event.preventDefault();
    
    if (this.isLoggedIn()) {
      this.router.navigate(['/create-portfolio']);
    } else {
      Swal.fire({
        title: 'Login Required',
        text: 'You must be logged in to create a portfolio.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#aaa'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
  
  
}
