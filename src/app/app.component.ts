import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginService } from './core/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'rebrus_front';
  private isDesktop = new BehaviorSubject<boolean>(window.innerWidth >= 1200);
  public isDesktopVersion: boolean;
  private s: Subscription[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop.next(window.innerWidth >= 1200);
  }
  constructor(private loginService: LoginService) {}

  get isDesktopVersion$() {
    return this.isDesktop.asObservable();
  }

  ngOnInit(): void {
    this.s.push(
      this.isDesktopVersion$.subscribe(isDesktop => {
        this.isDesktopVersion = isDesktop;
      })
    );
    setInterval(() => {
      const today = new Date();
      this.loginService.date$.next(this.formatDate(today));
    }, 1000);
  }

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
}
