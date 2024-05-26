import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription, tap } from 'rxjs';
import { LoginService } from '../../core/services/login.service';
import { IUserInfo } from '../../core/interfaces/login.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../core/services/notification.service';
import { isFieldInvalid } from '../../core/helpers';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public s: Subscription[] = [];
  public userInfo: IUserInfo = null;
  public passwordVisible = false;
  public confirmPassVisible = false;
  public currentPasswordVisible = false;

  public userInfoEditForm: FormGroup;
  public changePasswordForm: FormGroup;
  public changeEmailForm: FormGroup;

  public isActionLoader: boolean = false;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private notification: NotificationService,
    private profileService: ProfileService
  ) {
    this.userInfoEditForm = this.fb.group({
      role: ['Специалист', [Validators.required]],
      phone: ['7077077070', [Validators.required]],
      region: ['almaty', [Validators.required]],
      gender: ['M', [Validators.required]],
    });
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.changeEmailForm = this.fb.group({
      currentEmail: ['', [Validators.required]],
      newEmail: ['', [Validators.required]],
    });
  }

  get who() {
    return `${this.userInfo.lastName} ${this.userInfo.firstName} ${this.userInfo.middleName}`;
  }

  get ava() {
    return `${this.userInfo.lastName.substring(0, 1)} ${this.userInfo.firstName.substring(0, 1)}`;
  }

  isFieldWrapperInvalid = (field: string, form: FormGroup) =>
    isFieldInvalid(field, form);

  ngOnInit(): void {
    this.s.push(
      this.loginService.userInfo$
        .pipe(
          filter(Boolean),
          tap(res => (this.userInfo = res))
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.s.forEach(s => s.unsubscribe());
  }

  onChangeUserInfo() {}

  onChangePassword() {}

  onChangeEmail() {}

  actionWithProfile(action: string) {
    if (action === 'deactivate') {
      this.deactivateAccount();
    } else if (action === 'delete') {
      this.deleteAccount();
    }
  }

  deactivateAccount() {
    this.isActionLoader = true;
    this.s.push(
      this.profileService.deactivateAccount().subscribe({
        next: value => {
          this.isActionLoader = false;
          this.loginService.logout();
        },
        error: err => {
          this.isActionLoader = false;
          this.notification.show(
            'error',
            `Ошибка: ${err?.status}`,
            'Неизвестная ошибка'
          );
        },
      })
    );
  }

  deleteAccount() {
    this.isActionLoader = true;
    this.s.push(
      this.profileService.deleteAccount().subscribe({
        next: value => {
          this.isActionLoader = false;
          this.loginService.logout();
        },
        error: err => {
          this.isActionLoader = false;
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
