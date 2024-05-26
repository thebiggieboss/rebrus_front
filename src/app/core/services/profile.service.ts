import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  deactivateAccount() {
    return this.http.options(`${this.baseUrl}/auth/deactivate-account`);
  }

  deleteAccount() {
    return this.http.options(`${this.baseUrl}/auth/delete-account`);
  }
}
