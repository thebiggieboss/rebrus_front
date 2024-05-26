import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignUpService } from '../../core/services/sign-up.service';
import { isFieldInvalid, warnEmptyField } from '../../core/helpers';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  private s: Subscription[] = [];
  public isFirstStep: boolean = true;
  public isSecondStep: boolean = false;
  public passwordVisible = false;
  public confirmPassVisible = false;
  public isLoader: boolean = false;

  public form: FormGroup;

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        confirmPass: [
          '',
          Validators.compose([
            Validators.required,
            this.passwordMatchValidator(),
          ]),
        ],
        surname: ['', [Validators.required]],
        name: ['', [Validators.required]],
        patronymic: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        region: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        role: ['SPECIALIST', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control || !control.parent) {
        return null;
      }

      const password = control.parent.get('password');
      const confirmPass = control;

      if (!password || !confirmPass) {
        return null;
      }

      if (confirmPass.value !== password.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
    this.isFirstStep = true;
    this.isSecondStep = false;
  }

  isFieldWrapperInvalid = (field: string) => isFieldInvalid(field, this.form);

  onBack() {
    if (this.isSecondStep) {
      this.isFirstStep = true;
      this.isSecondStep = false;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onNext() {
    if (this.isFirstStep) {
      if (!this.form.valid) {
        warnEmptyField(this.form);
        return;
      }
      this.isFirstStep = false;
      this.isSecondStep = true;
    } else {
      this.register();
    }
  }

  register() {
    const form = this.form;
    let body = {
      email: form.get('email').value,
      password: form.get('password').value,
      phone: `8${form.get('phone').value}`,
      role: form.get('role').value,
      profile: {
        firstName: form.get('name').value,
        lastName: form.get('surname').value,
        middleName: form.get('patronymic').value,
        birthDate: new Date().toISOString().slice(0, 10),
        gender: form.get('gender').value,
      },
    };
    this.isLoader = true;
    this.s.push(
      this.signUpService.register(body).subscribe({
        next: res => {
          this.router.navigate(['/otp']);
          this.signUpService.signUpResponse$.next({
            ...res,
            email: body.email,
          });
          this.isLoader = false;
        },
        error: err => {
          this.isLoader = false;
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
