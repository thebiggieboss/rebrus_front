import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isFieldInvalid, warnEmptyField } from '../../../core/helpers';

@Component({
  selector: 'app-create-patient-modal',
  templateUrl: './create-patient-modal.component.html',
  styleUrls: ['./create-patient-modal.component.scss'],
})
export class CreatePatientModalComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Output() clicked: EventEmitter<string> = new EventEmitter();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      iin: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      patronymic: ['', [Validators.required]],
      responsible: ['', [Validators.required]],
      gender: ['male', [Validators.required]],
      region: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }
  isFieldWrapperInvalid = (field: string) => isFieldInvalid(field, this.form);

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  handleCancel() {
    this.clicked.emit('cancel');
  }

  handleOk() {
    if (!this.form.valid) {
      warnEmptyField(this.form);
      return;
    }
    alert('Free To API');
  }
}
