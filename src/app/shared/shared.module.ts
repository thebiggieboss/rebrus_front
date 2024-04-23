import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { LayoutComponent } from '../layout/layout/layout.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
  declarations: [PushComponent, CreatePatientModalComponent, LayoutComponent],
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
    NzGridModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzRadioModule,
    NzSliderModule,
    NzImageModule,
    NzAvatarModule,
  ],
  providers: [],
  exports: [
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
    LayoutComponent,
  ],
})
export class SharedModule {}
