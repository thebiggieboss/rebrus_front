import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isFieldInvalid, warnEmptyField } from '../../core/helpers';
import { LoginService } from '../../core/services/login.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordVisible = false;
  public s: Subscription[] = [];
  public isWelcome: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.showWelcomeModal();
  }
  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }
  isFieldWrapperInvalid(field: string) {
    return isFieldInvalid(field, this.form);
  }
  submit() {
    if (!this.form.valid) {
      warnEmptyField(this.form);
      return;
    }
    let params = {
      email: this.formControls['email'].value,
      password: this.formControls['password'].value,
    };
    this.s.push(
      this.loginService.login(params).subscribe({
        next: value => {
          this.loginService.setCookie('access_token', value, '/');
          this.loginService.setCookie('refresh_token', value, '/');
          setTimeout(() => {
            this.router.navigate(['/home'], {
              replaceUrl: true,
            });
          });
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

  showWelcomeModal() {
    const getLocalStorage = localStorage.getItem('welcome-modal');
    if (!getLocalStorage) {
      this.isWelcome = true;
    }
  }
}
