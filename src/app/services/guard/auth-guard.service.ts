import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.checkUser()) {
      this.router.navigate(['login']);
    }
    return this.authService.checkUser();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
