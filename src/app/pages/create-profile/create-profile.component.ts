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
  ProjectInput
} from '../../models/user-input.model';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
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
    projects: []
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:8080/usercontroller/createuserwithimage', this.user).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.router.navigate(['/profile', res.userId]); // ✅ Use userId from backend
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to create profile.');
      }
    });
  }

  addEducation() {
    this.user.educations.push({
      degree: '',
      institution: '',
      startYear: 0,
      endYear: 0
    });
  }

  addExperience() {
    this.user.experiences.push({
      jobTitle: '',
      company: '',
      startDate: 0,
      endDate: 0,
      description: ''
    });
  }

  addSkill() {
    this.user.skills.push({
      name: '',
      level: ''
    });
  }

  addProject() {
    this.user.projects.push({
      title: '',
      description: '',
      technologiesUsed: '',
      projectUrl: ''
    });
  }
}
