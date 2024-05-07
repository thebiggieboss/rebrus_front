import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestComponent } from './layout/guest/guest.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

registerLocaleData(ru);

const INTERCEPTOR = (type: any) => ({
  provide: HTTP_INTERCEPTORS,
  useClass: type,
  multi: true,
});

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
  providers: [
    { provide: NZ_I18N, useValue: ru_RU },
    INTERCEPTOR(ErrorInterceptor),
    INTERCEPTOR(TokenInterceptor),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
