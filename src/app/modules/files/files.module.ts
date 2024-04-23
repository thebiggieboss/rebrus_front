import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';

const routes: Routes = [
  {
    path: '',
    component: FilesComponent,
  },
];
@NgModule({
  declarations: [FilesComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesModule {}
