import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Education } from "./education.service";


export interface Project {
  id: number;
  title: string;
  description: string;
  technologiesUsed: string;
  projectUrl: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private baseUrl = 'http://localhost:8080/projectcontroller';

  constructor(private http: HttpClient) {}

  getProjectByUserId(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/userproject/${userId}`);
  }
}