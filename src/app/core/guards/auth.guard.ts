import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { v4 } from 'uuid';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    public auth: LoginService,
    public router: Router,
    public cookieService: CookieService,
    private notification: NotificationService
  ) {}
  canActivateChild(): boolean {
    return this.checkLogin();
  }

  canActivate(route: any, state: any): boolean {
    const token = route.queryParams['auth_token'];
    if (token) {
      const unique = v4();
      sessionStorage.setItem('token', unique);
      localStorage.setItem('token', unique);
      this.auth.setCookie('access_token', { access_token: token }, '/');
      return false;
    } else {
      return this.checkLogin();
    }
  }
  checkLogin(): boolean {
    if (!this.cookieService.get('access_token')) {
      this.router.navigate(['login']);
      this.notification.show('warning', '', 'Ваша сессия истекла');
      return false;
    }
    return true;
  }
}
