import { PushComponent } from '../../shared/components/push/push.component';
import { NzMessageDataOptions } from 'ng-zorro-antd/message';
import { ItemData } from '../interfaces/home.interfaces';
import { FormGroup } from '@angular/forms';

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

export function isFieldInvalid(field: string, form: FormGroup) {
  const formField = form.get(field);
  const valid =
    (!formField.valid && formField.touched && !formField.pristine) ||
    (!formField.valid && formField.dirty && !formField.pristine);
  return valid ? 'error' : '';
}
export function warnEmptyField(form: FormGroup) {
  const allFieldsControls = Object.keys(form.controls);
  let emptyField: string;
  allFieldsControls.forEach(f => {
    if (!form.get(f).value && form.get(f).status === 'INVALID') {
      if (!emptyField) {
        emptyField = f;
      }
      form.get(f).markAsTouched();
      form.get(f).markAsDirty();
    }
  });
  if (emptyField) {
    document.getElementById(emptyField)?.focus();
  }
}
