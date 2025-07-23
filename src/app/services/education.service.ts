import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationInput } from '../models/user-updation-model';

export interface Education {
  id?: number;
  degree: string;
  institution: string;
  startYear: string; // ✅ matches Java's startYear
  endYear: string; // ✅ matches Java's endYear
  user_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private baseUrl = 'http://localhost:8080/educationcontroller';

  constructor(private http: HttpClient) { }

  getEducationByUserId(userId: number): Observable<Education[]> {
    return this.http.get<Education[]>(
      `${this.baseUrl}/usereducation/${userId}`
    );
  }

  updateUserEducations(userId: number, educations: EducationInput[]) {
    return this.http.put<EducationInput[]>(
      `${this.baseUrl}/update/education/${userId}`,
      educations
    );
  }
}
