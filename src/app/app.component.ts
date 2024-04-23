import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  constructor() {}

  get isDesktopVersion$() {
    return this.isDesktop.asObservable();
  }

  ngOnInit(): void {
    this.s.push(
      this.isDesktopVersion$.subscribe(isDesktop => {
        this.isDesktopVersion = isDesktop;
      })
    );
  }

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }
}
