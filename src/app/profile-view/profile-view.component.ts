import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { Education, EducationService } from '../services/education.service';
import { Project, ProjectService } from '../services/project.service';
import { Skill, SkillService } from '../services/skill.service';
import { Experience, ExperienceService } from '../services/experience.service';
import { EducationInput, ExperienceInput, ProjectInput, SkillInput, UserBasicInput } from '../models/user-updation-model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/user-dto-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {

  imageBaseUrl = environment.apiUrlUser.replace('/usercontroller', '');
  user: User | null = null;
  editableUserBasic!: UserBasicInput;
  isEditing: boolean = false;
  userId!: number;

  isEditingEducation = false;
  isEditingExperience = false;
  isEditingProjects = false;
  isEditingSkills = false;

  isOwnerProfile: boolean = false;

  // Editable copies
  editableEducationList: EducationInput[] = [];
  editableExperienceList: ExperienceInput[] = [];
  editableProjectList: ProjectInput[] = [];
  editableSkillList: SkillInput[] = [];

  educationList: Education[] = [];
  projectList: Project[] = [];
  skillList: Skill[] = [];
  experienceList: Experience[] = [];

  isEditingProfile = false;

  userDto: UserDto = {
    fullName: '',
    email: '',
    phone: '',
    aboutMe: '',
    address: '',
    profileImageUrl: '',
    educations: [],
    experiences: [],
    skills: [],
    projects: []
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private educationService: EducationService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private experienceService: ExperienceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (!idFromRoute) {
      console.error('No user ID found in route.');
      return;
    }
  
    this.userId = Number(idFromRoute);
    const loggedInUserId = localStorage.getItem('userId');
  
    this.isOwnerProfile = loggedInUserId !== null && +loggedInUserId === this.userId;
  
    this.loadUser();
    this.loadAllOtherData();
  
    console.log('Route userId:', this.userId);
    console.log('Logged-in userId:', loggedInUserId);
    console.log('isOwnerProfile:', this.isOwnerProfile);
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
  // Image Section
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    console.log('Selected file:', file);
    console.log('User:', this.user);

    if (file && this.userId) {
      const formData = new FormData();
      formData.append('image', file);

      this.http
        .put(
          `${environment.apiUrlUser}/updateuserimage/${this.userId}`,
          formData
        )
        .subscribe({
          next: (res) => {
            console.log('Image uploaded successfully', res);
            this.loadUser(); // Refresh profile data
          },
          error: (err) => {
            console.error('Image upload failed', err);
          },
        });
    } else {
      console.warn('User ID is not available for image upload', this.userId);
    }
  }

  // Basic Info Section
  onEditToggleBasicInfo() {
    if (!this.isEditing && this.user) {
      this.editableUserBasic = {
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
    this.userService
      .updateUserBasicInfo(this.userId, this.editableUserBasic)
      .subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.isEditing = false;
          console.log('User updated successfully');
        },
        error: (err) => {
          console.error('Failed to update user', err);
        },
      });
  }

  // Education Section
  onEditEducation() {
    this.isEditingEducation = true;
    this.editableEducationList = JSON.parse(JSON.stringify(this.educationList));
  }

  submitEducationUpdate() {
    const userId = this.userId;
    // Make sure this is already set in your component (e.g., from route param)

    this.educationService
      .updateUserEducations(userId, this.editableEducationList)
      .subscribe({
        next: (response) => {
          console.log('Education updated successfully:', response);
          this.isEditingEducation = false;
          this.loadAllOtherData(); // reload data to reflect updates
        },
        error: (err) => {
          console.error('Error updating education:', err);
        },
      });
  }

  // Experience Section
  onEditExperience() {
    this.isEditingExperience = true;

    if (this.experienceList.length === 0) {
      this.editableExperienceList = [{
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }];
    } else {
      this.editableExperienceList = JSON.parse(JSON.stringify(this.experienceList));
    }
  }


  submitExperienceUpdate() {
    const userId = this.userId; // Make sure this is already set in your component (e.g., from route param)

    this.experienceService
      .updateUserExperience(userId, this.editableExperienceList)
      .subscribe({
        next: (response) => {
          console.log('Experience updated successfully:', response);
          this.isEditingExperience = false;
          this.loadAllOtherData(); // reload data to reflect updates
        },
        error: (err) => {
          console.error('Error updating Experience:', err);
        },
      });
  }

  // Project Section
  onEditProjects() {
    this.isEditingProjects = true;
    this.editableProjectList = JSON.parse(JSON.stringify(this.projectList))
  }

  submitProjectUpdate() {
    const userId = this.userId; // Make sure this is already set in your component (e.g., from route param)

    this.projectService
      .updateUserProject(userId, this.editableProjectList)
      .subscribe({
        next: (response) => {
          console.log('Experience updated successfully:', response);
          this.isEditingProjects = false;
          this.loadAllOtherData(); // reload data to reflect updates
        },
        error: (err) => {
          console.error('Error updating Experience:', err);
        },
      });
  }

  // Skill Section
  onEditSkills() {
    this.isEditingSkills = true;
    this.editableSkillList = JSON.parse(JSON.stringify(this.skillList))
  }

  submitSkillUpdate() {
    const userId = this.userId; // Make sure this is already set in your component (e.g., from route param)

    this.skillService
      .updateUserSkill(userId, this.editableSkillList)
      .subscribe({
        next: (response) => {
          console.log('Experience updated successfully:', response);
          this.isEditingSkills = false;
          this.loadAllOtherData(); // reload data to reflect updates
        },
        error: (err) => {
          console.error('Error updating Experience:', err);
        },
      });
  }


  addSkill() {
    this.editableSkillList.push({ name: '', level: '' });
  }

  addEducation() {
    this.editableEducationList.push({
      degree: '',
      institution: '',
      startYear: '',
      endYear: ''
    });
  }

  addExperience() {
    this.editableExperienceList.push({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  }

  addProject() {
    this.editableProjectList.push({
      title: '',
      description: '',
      technologiesUsed: '',
      projectUrl: ''
    });
  }



  toggleProfileEditMode() {
    this.isEditingProfile = !this.isEditingProfile;

    if (this.isEditingProfile) {
      // Enter edit mode for all sections
      this.onEditToggleBasicInfo();
      this.onEditEducation();
      this.onEditSkills();
      this.onEditProjects();
      this.onEditExperience(); // make sure this handles empty case!
    } else {
      // Exit edit mode and save everything
      this.submitUpdateBasicInfo();
      this.submitEducationUpdate();
      this.submitSkillUpdate();
      this.submitProjectUpdate();
      this.submitExperienceUpdate();
    }
  }

  


}
