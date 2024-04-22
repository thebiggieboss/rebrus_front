import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { IconsProviderModule } from '../modules/icons/icons-provider.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { PushComponent } from './components/push/push.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CreatePatientModalComponent } from './components/create-patient-modal/create-patient-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    MainLayoutComponent,
    PushComponent,
    CreatePatientModalComponent,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    IconsProviderModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzButtonModule,
    NzAlertModule,
    NzMessageModule,
    NzSpinModule,
    NzTableModule,
    NzModalModule,
  ],
  providers: [],
  exports: [
    MainLayoutComponent,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzButtonModule,
    NzAlertModule,
    NzMessageModule,
    PushComponent,
    NzTableModule,
    CreatePatientModalComponent,
  ],
})
export class SharedModule {}
