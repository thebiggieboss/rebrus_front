import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { PatientProfileComponent } from './pages/patient-profile/patient-profile.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      {
        path: ':id',
        component: PatientProfileComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [PatientsComponent, PatientProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NzDropDownModule,
  ],
  exports: [RouterModule],
})
export class PatientsModule {}
