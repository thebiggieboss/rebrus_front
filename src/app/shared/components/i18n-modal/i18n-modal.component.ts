import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-i18n-modal',
  templateUrl: './i18n-modal.component.html',
  styleUrls: ['./i18n-modal.component.scss'],
})
export class I18nModalComponent implements OnInit {
  @Input() isVisible: boolean = false;

  public locale: string = 'ru';

  constructor(private translate: TranslateService) {
    this.locale = localStorage.getItem('locale') || 'ru';
  }

  ngOnInit(): void {}

  handleCancel() {
    this.isVisible = false;
  }

  setLocale(locale: string): void {
    this.locale = locale;
    localStorage.setItem('locale', this.locale);
    this.translate.use(locale);
  }
}
