import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { IconsProviderModule } from '../modules/icons/icons-provider.module';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    IconsProviderModule,
    NzInputModule,
  ],
  providers: [],
  exports: [
    MainLayoutComponent,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzInputModule,
  ],
})
export class SharedModule {}
