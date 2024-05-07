import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> | Observable<any> {
    const idToken = this.cookieService.get('access_token');
    if (idToken) {
      if (!sessionStorage.getItem('token')) {
        if (localStorage.getItem('token')) {
          sessionStorage.setItem('token', localStorage.getItem('token'));
        } else {
          this.loginService.logout();
        }
      } else {
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', sessionStorage.getItem('token'));
        }
      }
      this.loginService.setAuthorizedStatus(true);
      let request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${idToken}`),
      });
      return next.handle(request).pipe(catchError(error => throwError(error)));
    } else {
      return next.handle(req);
    }
  }
}
