import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Education } from "./education.service";
import { SkillInput } from "../models/user-updation-model";


export interface Skill {
  id: number;
  name: string;
  level: string;
  user_id: number;
}

@Injectable({
  providedIn: 'root'
})

export class SkillService {
  private baseUrl = 'http://localhost:8080/skillcontroller';

  constructor(private http: HttpClient) {}

  getskillByUserId(userId: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.baseUrl}/userskill/${userId}`);
  }

  updateUserSkill(userId: number, skills: SkillInput[]) {
          return this.http.put<SkillInput[]>(
            `${this.baseUrl}/update/${userId}`,
            skills
          );
        }
}