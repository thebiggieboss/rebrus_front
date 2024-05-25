import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { NzSelectModule } from 'ng-zorro-antd/select';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NzSelectModule,
  ],
  exports: [RouterModule],
})
export class ProfileModule {}
