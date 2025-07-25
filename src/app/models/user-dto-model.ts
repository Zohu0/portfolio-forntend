export interface UserDto {
    fullName: string;
    email: string;
    phone: string;
    aboutMe: string;
    address: string;
    profileImageUrl: string;
    educations: {
      // Add properties for EducationDto here
      // Example:
      degree: string;
      university: string;
      startDate: string; // Or Date, depending on your date handling
      endDate: string;   // Or Date
      description?: string;
    }[];
    experiences: {
      // Add properties for ExperienceDto here
      // Example:
      title: string;
      company: string;
      startDate: string; // Or Date
      endDate: string;   // Or Date
      description: string;
      location?: string;
    }[];
    skills: {
      // Add properties for SkillDto here
      // Example:
      name: string;
      proficiency: string;
    }[];
    projects: {
      // Add properties for ProjectDto here
      // Example:
      title: string;
      description: string;
      technologies: string[];
      projectUrl?: string;
      githubUrl?: string;
    }[];
  }