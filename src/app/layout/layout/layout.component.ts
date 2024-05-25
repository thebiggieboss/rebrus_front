import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { filter, Subscription, tap } from 'rxjs';
import { IUserInfo } from '../../core/interfaces/login.interfaces';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public s: Subscription[] = [];
  public isI18nModal: boolean = false;
  public userInfo: IUserInfo = null;

  constructor(public loginService: LoginService) {}

  get who() {
    return `${this.userInfo?.lastName} ${this.userInfo?.firstName} ${this.userInfo?.middleName}`;
  }

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

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }

  logout() {
    this.s.push(
      this.loginService.authLogout().subscribe({
        next: value => {
          this.loginService.logout();
        },
        error: err => {
          this.loginService.logout();
        },
      })
    );
  }

  onOpenModal() {
    this.isI18nModal = !this.isI18nModal;
  }
}
