import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
];
@NgModule({
  declarations: [ScheduleComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleModule {}
