import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestComponent } from './layout/guest/guest.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';

registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent, GuestComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  bootstrap: [AppComponent],
})
export class AppModule {}
