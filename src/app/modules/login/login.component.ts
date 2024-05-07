import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  isFieldInvalid,
  showMessage,
  warnEmptyField,
} from '../../core/helpers';
import { LoginService } from '../../core/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordVisible = false;
  public s: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private loginService: LoginService
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

  ngOnInit(): void {}
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
          console.log(value);
        },
        error: err => {
          console.log(err);
        },
      })
    );
  }
}
