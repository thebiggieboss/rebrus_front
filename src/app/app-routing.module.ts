import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./modules/patients/patients.module').then(m => m.PatientsModule),
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./modules/files/files.module').then(m => m.FilesModule),
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./modules/schedule/schedule.module').then(m => m.ScheduleModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then(m => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
