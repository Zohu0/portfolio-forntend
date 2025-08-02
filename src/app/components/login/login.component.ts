import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  isLogin = true;

  authData: any = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.authData = { fullName: '', email: '', password: '' };
  }

  onSubmit() {
    const endpoint = this.isLogin ? '/auth/login' : '/auth/register';
    const fullUrl = `${environment.apiBaseUrl}${endpoint}`;
  
    this.http.post<any>(fullUrl, this.authData).subscribe({
      next: (res: any) => {
        if (this.isLogin) {
          // ⛳ Login Success: extract token and userId
          const token = res.token?.replace('Bearer ', '') || '';
          const userId = res.userId;
  
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId.toString());
  
          // 🔍 Check if user has a profile
          const profileCheckUrl = `${environment.apiBaseUrl}/user/has-profile/${userId}`;
          const headers = { Authorization: `Bearer ${token}` };
  
          this.http.get<boolean>(profileCheckUrl, { headers }).subscribe({
            next: (hasProfile: boolean) => {
              if (hasProfile) {
                this.router.navigate([`/profile/${userId}`]);
              } else {
                this.router.navigate(['/create-portfolio']);
              }
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: '❌ Error while checking profile.',
              });
            }
          });
  
        } else {
          // 🎯 Signup Success: show beautiful SweetAlert popup
          Swal.fire({
            title: '🎉 Account Created!',
            text: 'Your account has been created successfully. Please login to continue.',
            icon: 'success',
            confirmButtonText: 'Login Now',
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
              this.authData = { fullName: '', email: '', password: '' };
              this.isLogin = true;
            }
          });
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error?.message || 'Something went wrong.',
        });
      }
    });
  }
  
  
  
  
}
