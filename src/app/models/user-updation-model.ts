// This file is only for form user updation

export interface UserBasicInput {
    fullName: string;
    email: string;
    phone: string;
    aboutMe: string;
    address: string;
  }

  export interface EducationInput {
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface ExperienceInput {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
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
