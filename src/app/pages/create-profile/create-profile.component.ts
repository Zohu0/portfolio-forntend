import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

// ✅ Import interfaces for form input
import {
  UserInput,
  EducationInput,
  ExperienceInput,
  SkillInput,
  ProjectInput,
} from '../../models/user-input.model';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent {
  // ✅ Strong typing for user object
  user: UserInput = {
    fullName: '',
    email: '',
    phone: '',
    aboutMe: '',
    address: '',
    educations: [],
    experiences: [],
    skills: [],
    projects: [],
  };

  selectedFile: File | null = null;
  selectedImagePreview: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const hasValidEducation = this.user.educations.every(edu =>
      edu.degree?.trim() &&
      edu.institution?.trim() &&
      edu.startYear?.trim() &&
      edu.endYear?.trim()
    );
  
    if (!hasValidEducation || this.user.educations.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Education',
        text: 'Please fill all required education fields before submitting.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
    const formData = new FormData();
    const userJson = JSON.stringify(this.user);
    formData.append('user', new Blob([userJson], { type: 'application/json' }));
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    this.http.post<any>(`${environment.apiUrlUser}/createuserwithimage`, formData)
      .subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Profile Created',
            text: '🎉 Your profile has been created successfully!',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/profile', res.userId]);
          });
        },
        error: (err) => {
          console.error('❌ Error creating profile:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to create profile. Please try again.',
            confirmButtonColor: '#d33'
          });
        }
      });
  }
  
  


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview
      const reader = new FileReader();
      reader.onload = () => (this.selectedImagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  addEducation() {
    this.user.educations.push({
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
    });
  }

  addExperience() {
    this.user.experiences.push({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  }

  addSkill() {
    this.user.skills.push({
      name: '',
      level: '',
    });
  }

  addProject() {
    this.user.projects.push({
      title: '',
      description: '',
      technologiesUsed: '',
      projectUrl: '',
    });
  }


}
