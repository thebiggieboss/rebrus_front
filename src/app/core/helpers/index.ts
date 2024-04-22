import { PushComponent } from '../../shared/components/push/push.component';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';
import { ItemData } from '../interfaces/home.interfaces';

export function showMessage(
  type: string,
  msService: any,
  options: NzMessageDataOptions
) {
  msService.create(type, PushComponent, options);
}
export const listOfColumn: any = [
  {
    title: 'Фамилия',
    sortOrder: null,
    sortFn: (a: ItemData, b: ItemData) => a.surname.localeCompare(b.surname),
    listOfFilter: [],
    filterFn: null,
  },
  {
    title: 'Имя',
    sortOrder: null,
    sortFn: (a: ItemData, b: ItemData) => a.name.localeCompare(b.name),
    listOfFilter: [],
    filterFn: null,
  },
  {
    title: 'ИИН',
    sortOrder: null,
    sortFn: (a: ItemData, b: ItemData) => Number(a.iin) - Number(b.iin),
    listOfFilter: [],
    filterFn: null,
  },
  {
    title: 'Пол',
    sortOrder: null,
    sortFn: (a: ItemData, b: ItemData) => a.gender.localeCompare(b.gender),
    listOfFilter: [],
    filterFn: null,
  },
  {
    title: 'Дата создания',
    sortOrder: null,
    sortFn: null,
    listOfFilter: [],
    filterFn: null,
  },
];
