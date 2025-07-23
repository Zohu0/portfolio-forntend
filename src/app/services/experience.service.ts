import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Education } from "./education.service";
import { ExperienceInput } from "../models/user-updation-model";


export interface Experience {
  id?: number;
  jobTitle: string;
  company: string;
  startDate: string;     // ✅ Integer in backend, should be number
  endDate: string;       // ✅ Integer in backend, should be number
  description: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {
  private baseUrl = 'http://localhost:8080/experiencecontroller';

  constructor(private http: HttpClient) {}

  getexperienceByUserId(userId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.baseUrl}/userexperience/${userId}`);
  }

  updateUserExperience(userId: number, experiences: ExperienceInput[]) {
      return this.http.put<ExperienceInput[]>(
        `${this.baseUrl}/updateExperience/${userId}`,
        experiences
      );
    }
}