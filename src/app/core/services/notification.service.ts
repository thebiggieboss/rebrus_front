import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  show(type: string, title: string, content: string) {
    this.notification.create(type, title, content, {
      nzDuration: 5000,
      nzPlacement: 'top',
    });
  }
}
