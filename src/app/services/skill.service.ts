import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Education } from "./education.service";
import { SkillInput } from "../models/user-updation-model";
import { environment } from "../../environments/environment";


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
  private baseUrl = environment.apiUrlSkill;

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