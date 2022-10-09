import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.models';
import { UserModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginEndpointPath = 'auth/login';
  private loginEndpointUrl = environment.BACKEND_URL + this.loginEndpointPath;

  private registerEndpointPath = 'auth/register';
  private registerEndpointUrl = environment.BACKEND_URL + this.registerEndpointPath;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) { }

  Register(model : UserModel) {
    return this.http.post<any>(this.registerEndpointUrl, model)
  }

  Login(model: LoginModel) {
    return this.http.post<any>(this.loginEndpointUrl, model)
  }

  checkUser() {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      return false
    }
  }
  getUser() {
    if (this.checkUser()) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    else {
      this.logout()
    }
  }
  
  logout() {
    localStorage.clear();
    return this.route.navigate(['/login']);
  }
}
