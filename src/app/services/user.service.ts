import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUserProfile = 'user';
  private getUserProfileUrl = environment.BACKEND_URL + this.getUserProfile;

  private updateUserProfile = 'user/update';
  private updateUserProfileUrl = environment.BACKEND_URL + this.updateUserProfile;
  constructor(private http: HttpClient) { }
  
  getProfile(id:string) {
    return this.http.get<any>(`${this.getUserProfileUrl}/${id}`)
  }

  updateProfile(user : UserModel){
    return this.http.put<any>(this.updateUserProfileUrl,user)
  }
}
