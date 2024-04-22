import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { showMessage } from '../../core/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  isFieldInvalid(field: string) {
    const formField = this.form.get(field);
    const valid =
      (!formField.valid && formField.touched && !formField.pristine) ||
      (!formField.valid && formField.dirty && !formField.pristine);
    return valid ? 'error' : '';
  }
  submit() {
    if (!this.form.valid) {
      // showMessage('error', this.message, {});
    }
  }
}
