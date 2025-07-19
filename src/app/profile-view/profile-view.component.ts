import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { Education, EducationService } from '../services/education.service';
import { Project, ProjectService } from '../services/project.service';
import { Skill, SkillService } from '../services/skill.service';
import { Experience, ExperienceService } from '../services/experience.service';
import { UserBasicInput } from '../models/user-updation-model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  user: User | null = null;
  editableUser!: UserBasicInput;
  isEditing: boolean = false;
  userId!: number;

  educationList: Education[] = [];
  projectList: Project[] = [];
  skillList: Skill[] = [];
  experienceList: Experience[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private educationService: EducationService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private experienceService: ExperienceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (!idFromRoute) {
      console.error('No user ID found in route.');
      return;
    }

    this.userId = Number(idFromRoute);
    this.loadUser();
    this.loadAllOtherData();
  }

  loadUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
    });
  }

  loadAllOtherData() {
    this.educationService.getEducationByUserId(this.userId).subscribe({
      next: (data) => {
        this.educationList = data;
      },
      error: (err) => console.error('Failed to load education:', err),
    });

    this.projectService.getProjectByUserId(this.userId).subscribe({
      next: (data) => {
        this.projectList = data;
      },
      error: (err) => console.error('Failed to load project:', err),
    });

    this.skillService.getskillByUserId(this.userId).subscribe({
      next: (data) => {
        this.skillList = data;
      },
      error: (err) => console.error('Failed to load skill:', err),
    });

    this.experienceService.getexperienceByUserId(this.userId).subscribe({
      next: (data) => {
        this.experienceList = data;
      },
      error: (err) => console.error('Failed to load experience:', err),
    });
  }

  onEditToggle() {
    if (!this.isEditing && this.user) {
      this.editableUser = {
        fullName: this.user.fullName,
        email: this.user.email,
        phone: this.user.phone,
        aboutMe: this.user.aboutMe,
        address: this.user.address,
      };
      this.isEditing = true;
    } else {
      this.submitUpdateBasicInfo();
    }
  }

  submitUpdateBasicInfo() {
    this.userService.updateUserBasicInfo(this.userId, this.editableUser).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.isEditing = false;
        console.log('User updated successfully');
      },
      error: (err) => {
        console.error('Failed to update user', err);
      }
    });
  }

  onImageSelected(event: any) {
  const file: File = event.target.files[0];
  console.log('Selected file:', file);
  console.log('User:', this.user);

  if (file && this.userId) {
    const formData = new FormData();
    formData.append("image", file);

    this.http.put(`http://localhost:8080/usercontroller/uploadprofile/${this.userId}`, formData).subscribe({
      next: (res) => {
        console.log('Image uploaded successfully', res);
        this.loadUser(); // Refresh profile data
      },
      error: (err) => {
        console.error('Image upload failed', err);
      }
    });
  } else {
    console.warn("User ID is not available for image upload", this.userId);
  }
}

}
