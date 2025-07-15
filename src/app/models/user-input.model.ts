// This file is only for form user submission

export interface EducationInput {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
}

export interface ExperienceInput {
  jobTitle: string;
  company: string;
  startDate: number;
  endDate: number;
  description: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  technologiesUsed: string;
  projectUrl: string;
}

export interface SkillInput {
  name: string;
  level: string;
}

export interface UserInput {
  fullName: string;
  email: string;
  phone: string;
  aboutMe: string;
  address: string;
  educations: EducationInput[];
  experiences: ExperienceInput[];
  skills: SkillInput[];
  projects: ProjectInput[];
}


