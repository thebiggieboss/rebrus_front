import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignUpService } from '../../core/services/sign-up.service';
import { isFieldInvalid, warnEmptyField } from '../../core/helpers';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';

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

  public form: FormGroup;

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      confirmPass: ['', Validators.compose([Validators.required])],
      surname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      patronymic: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      region: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['SPECIALIST', [Validators.required]],
    });
  }

  // passwordMatchValidator(control: AbstractControl) {
  //   const password = this.form;
  //   const confirmPass = control?.value;
  //   console.log(password);
  //   return { mismatch: true };
  // }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }

  isFieldWrapperInvalid = (field: string) => isFieldInvalid(field, this.form);

  onBack() {}

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
    this.s.push(
      this.signUpService.register(body).subscribe({
        next: value => {
          console.log(value);
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
