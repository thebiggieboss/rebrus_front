import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public s: Subscription[] = [];
  public isI18nModal: boolean = false;

  constructor(public loginService: LoginService) {}

  ngOnInit(): void {}

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
