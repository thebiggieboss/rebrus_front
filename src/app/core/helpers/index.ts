import { PushComponent } from '../../shared/components/push/push.component';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';

export function showMessage(
  type: string,
  msService: any,
  options: NzMessageDataOptions
) {
  msService.create(type, PushComponent, options);
}
