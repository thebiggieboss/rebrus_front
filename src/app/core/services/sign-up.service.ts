import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../interfaces/login.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IOtpCode,
  IOtpSend,
  IResendCode,
  IResOtp,
  ISignUpRes,
} from '../interfaces/sign-up.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  baseUrl = 'http://localhost:8080';

  public signUpResponse$: BehaviorSubject<IOtpSend> =
    new BehaviorSubject<IOtpSend>(null);

  constructor(private http: HttpClient) {}

  register(body: IRegister): Observable<ISignUpRes> {
    return this.http.post<ISignUpRes>(`${this.baseUrl}/auth/register`, body);
  }

  resendCode(body: IResendCode): Observable<ISignUpRes> {
    return this.http.post<ISignUpRes>(
      `${this.baseUrl}/auth/resend-verification-code`,
      body
    );
  }

  checkCode(body: IOtpCode): Observable<IResOtp> {
    return this.http.post<IResOtp>(
      `${this.baseUrl}/auth/check-verification-code`,
      body
    );
  }
}
