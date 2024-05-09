import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ILogin } from '../interfaces/login.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.baseUrl;
  authorized = new BehaviorSubject<boolean>(false);

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(params: ILogin) {
    return this.http.post(`${this.baseUrl}/auth/login`, params);
  }

  logout() {
    this.setAuthorizedStatus(false);
    this.cookieService.deleteAll('/');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  setAuthorizedStatus(val: boolean) {
    this.authorized.next(val);
  }

  setCookie(name: string, value: any, path: string) {
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);
    this.cookieService.set(name, value[name], expirationTime, path);
    this.setAuthorizedStatus(true);
  }
}
