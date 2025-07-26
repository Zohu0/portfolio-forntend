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
  const formData = new FormData();

  // Serialize the user object as JSON and append it as a Blob
  const userJson = JSON.stringify(this.user);
  formData.append('user', new Blob([userJson], { type: 'application/json' }));

  // Append the selected image file (if any)
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  // Make the POST request to backend
  this.http.post<any>(`${environment.apiUrlUser}/createuserwithimage`, formData)
    .subscribe({
      next: (res) => {
        console.log('Response:', res);
        // Assuming backend returns userId in response
        this.router.navigate(['/profile', res.userId]);
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to create profile.');
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
