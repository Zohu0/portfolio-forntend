import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user.service';
import { RouterOutlet } from '@angular/router';
import { Education, EducationService } from '../services/education.service';
import { Project, ProjectService } from '../services/project.service';
import { Skill, SkillService } from '../services/skill.service';
import { Experience, ExperienceService } from '../services/experience.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: User | null = null;

  educationList: Education[] = [];

  projectList: Project[] = [];

  skillList: Skill[] = [];

  experienceList: Experience[] = [];

  constructor(private userService: UserService , private educationService: EducationService, private projectService: ProjectService, private skillService: SkillService, private experienceService: ExperienceService) {} 

  ngOnInit(): void {
    const userId = 6; // Change to actual user ID as needed
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    })
    
      this.educationService.getEducationByUserId(userId).subscribe({
    next: (data) => {
      console.log('Education data:', data);
      this.educationList = data;
    },
    error: (err) => console.error('Failed to load education:', err)
  })
  
  this.projectService.getProjectByUserId(userId).subscribe({
    next: (data) => {
      console.log('Project data:', data);
      this.projectList = data;
    },
    error: (err) => console.error('Failed to load education:', err)
  })
  
  this.skillService.getskillByUserId(userId).subscribe({
    next: (data) => {
      console.log('Skill data:', data);
      this.skillList = data;
    },
    error: (err) => console.error('Failed to load education:', err)
  }) 

  this.experienceService.getexperienceByUserId (userId).subscribe({
    next: (data) => {
      console.log('ExperienceData data:', data);
      this.experienceList = data;
    },
    error: (err) => console.error('Failed to load education:', err)
  });
  }
}
