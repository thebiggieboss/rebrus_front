import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../interfaces/login.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(body: IRegister) {
    return this.http.post(`${this.baseUrl}/auth/register`, body);
  }
}
