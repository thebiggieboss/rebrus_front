import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const routes: Routes = [
  {
    path: '',
    component: FilesComponent,
  },
];
@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    NzDropDownModule,
    NzModalModule,
    NzUploadModule,
  ],
  exports: [RouterModule],
})
export class FilesModule {}
