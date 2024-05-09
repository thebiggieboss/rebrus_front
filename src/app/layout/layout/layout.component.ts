import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public date: string;
  public isI18nModal: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    setInterval(() => {
      const today = new Date();
      this.date = this.formatDate(today);
    }, 1000);
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

  logout() {
    this.loginService.logout();
  }

  onOpenModal() {
    this.isI18nModal = !this.isI18nModal;
  }
}
