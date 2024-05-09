import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { NzSelectModule } from 'ng-zorro-antd/select';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NzSelectModule,
  ],
  exports: [RouterModule],
})
export class SignUpModule {}
