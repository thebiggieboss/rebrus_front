import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './otp.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { NgOtpInputModule } from 'ng-otp-input';

const routes: Routes = [
  {
    path: '',
    component: OtpComponent,
  },
];

@NgModule({
  declarations: [OtpComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgOtpInputModule,
  ],
  exports: [RouterModule, NgOtpInputModule],
})
export class OtpModule {}
