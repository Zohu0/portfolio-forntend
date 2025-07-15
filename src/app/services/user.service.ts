import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserBasicInput} from '../models/user-updation-model';

export interface User {
  id?: number;
  fullName: string;     // ✅ matches `fullName` (not full_name)
  email: string;
  phone: string;
  aboutMe: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/usercontroller';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/userportfolio/${id}`);
  }

  updateUserBasicInfo(id: number, userData: UserBasicInput): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updatebasicdetails/${id}`, userData);
  }
  
  
}
