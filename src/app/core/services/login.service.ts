import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ILogin, IUserInfo } from '../interfaces/login.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = 'http://localhost:8080';
  authorized = new BehaviorSubject<boolean>(false);

  public date$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public userInfo$: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(
    null
  );

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

  authLogout() {
    return this.http.options(`${this.baseUrl}/auth/logout`);
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.http.get<IUserInfo>(`${this.baseUrl}/auth/user-info`);
  }
}
