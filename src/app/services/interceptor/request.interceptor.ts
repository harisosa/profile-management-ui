import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../auth.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private spinnerService: NgxSpinnerService,
    private authService: AuthService) {

  }
  // intercept outgoing request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get currentUser Token
    this.spinnerService.show();
    if (localStorage.getItem('user')) {

      let currentUserToken = null;
      let user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.token) {
        currentUserToken = JSON.parse(localStorage.getItem('user') || '{}').token;
      }

      // set new headers
      let newReq;
      if (currentUserToken) {
        newReq = req.clone({ headers: req.headers.set('Authorization', ('bearer ' + currentUserToken)) });
        return next.handle(newReq).pipe(
          finalize(() => {
            this.spinnerService.hide();
          }));
      }
      else {
        this.authService.logout();

        return next.handle(req).pipe(
          finalize(() => {
            this.spinnerService.hide();
          }));
      }
    } else {
      return next.handle(req).pipe(
        finalize(() => {
            this.spinnerService.hide();
        }));
    }
  }// intercept

}