import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Education } from "./education.service";


export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
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
}