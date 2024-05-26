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
import { PatientService } from '../../../core/services/patient.service';
import { IPatientCreate } from '../../../core/interfaces/patient.interfaces';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-patient-modal',
  templateUrl: './create-patient-modal.component.html',
  styleUrls: ['./create-patient-modal.component.scss'],
})
export class CreatePatientModalComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Output() clicked: EventEmitter<string> = new EventEmitter();

  public form: FormGroup;
  public s: Subscription[] = [];
  public isLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      iin: ['', [Validators.required, Validators.minLength(12)]],
      surname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      patronymic: ['', [Validators.required]],
      responsible: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      region: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }
  isFieldWrapperInvalid = (field: string) => isFieldInvalid(field, this.form);

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }

  handleCancel() {
    this.clicked.emit('cancel');
  }

  handleOk() {
    if (!this.form.valid) {
      warnEmptyField(this.form);
      return;
    }
    const getFormValue = (controller: string) =>
      this.form.get(controller).value;

    this.isLoader = true;

    let body: IPatientCreate = {
      firstName: getFormValue('name'),
      lastName: getFormValue('surname'),
      middleName: getFormValue('patronymic'),
      iin: getFormValue('iin'),
      phone: getFormValue('phone'),
      birthDate: new Date(this.form.get('dateOfBirth').value)
        .toISOString()
        .slice(0, 10),
      gender: getFormValue('gender'),
      region: getFormValue('region'),
      address: getFormValue('address'),
      responsible: getFormValue('responsible'),
    };

    this.s.push(
      this.patientService.createPatient(body).subscribe({
        next: value => {
          this.isLoader = false;
          this.router.navigate([`/patients/${value?.id}`]);
        },
        error: err => {
          this.isLoader = false;
          this.notification.show(
            'error',
            `Ошибка: ${err?.status}`,
            'Неизвестная ошибка'
          );
        },
      })
    );
  }
}
