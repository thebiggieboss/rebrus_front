import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
];
@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NzDropDownModule,
    NzDatePickerModule,
  ],
  exports: [RouterModule],
})
export class ScheduleModule {}
