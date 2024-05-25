import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignUpService } from '../../core/services/sign-up.service';
import { filter, map, Subscription, take, tap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit, OnDestroy {
  private s: Subscription[] = [];
  public email: string = 'ul****@gmail.com';
  public countdownSeconds = 120; // 2 минуты = 120 секунд
  public remainingTime: string = this.formatTime(this.countdownSeconds);
  public isDisabled: boolean = false;

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private notification: NotificationService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.s.push(
      this.signUpService.signUpResponse$
        .pipe(
          tap(res => {
            if (res === null) {
              this.router.navigate(['/sign-up']);
            } else {
              this.email = res?.email;
              this.startCountDown();
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
    this.signUpService.signUpResponse$.next(null);
  }

  startCountDown(): void {
    const countdown$ = timer(0, 1000).pipe(
      take(this.countdownSeconds + 1),
      map(second => this.countdownSeconds - second)
    );

    this.s.push(
      countdown$.subscribe(
        remaining => {
          this.remainingTime = this.formatTime(remaining);
        },
        error => console.log(error),
        () => {
          this.isDisabled = true;
          this.notification.show(
            'warning',
            ``,
            'Извините, время действия вашего кода истекло. Пожалуйста, запросите новый код и повторите попытку!'
          );
        }
      )
    );
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  onOtpChange(event: string) {
    if (!this.isDisabled && event.length === 4) {
      const res = this.signUpService.signUpResponse$.value;
      let body = {
        request_number: res?.request_number,
        expiration_date: res?.expiration_date,
        created_date: res?.expiration_date,
        code: event,
      };
      this.s.push(
        this.signUpService.checkCode(body).subscribe({
          next: value => {
            console.log(value);
            this.router.navigate(['/home']);
            this.loginService.setCookie('access_token', value, '/');
            this.loginService.setCookie('refresh_token', value, '/');
          },
          error: err => {
            this.notification.show(
              'error',
              `Ошибка: ${err?.status}`,
              'Неизвестная ошибка'
            );
          },
        })
      );
    }
  }

  resend() {
    let body = {
      ...this.signUpService.signUpResponse$.value,
    };
    this.s.push(
      this.signUpService.resendCode(body).subscribe({
        next: value => {
          this.signUpService.signUpResponse$.next({
            ...value,
            email: this.email,
          });
          this.isDisabled = false;
          this.startCountDown();
        },
        error: err => {
          this.notification.show(
            'error',
            `Ошибка: ${err?.status}`,
            'Неизвестная ошибка'
          );
        },
      })
    );
  }

  submit() {}
}
