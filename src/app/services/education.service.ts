import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Education {
  id: number;
  degree: string;
  institution: string;
  start_year: number;
  end_year: number;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private baseUrl = 'http://localhost:8080/educationcontroller';

  constructor(private http: HttpClient) {}

  getEducationByUserId(userId: number): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.baseUrl}/usereducation/${userId}`);
  }
}
