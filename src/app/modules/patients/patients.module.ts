import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
];
@NgModule({
  declarations: [PatientsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsModule {}
