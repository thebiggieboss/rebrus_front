import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { listOfColumn } from '../../core/helpers';
import { ItemData } from '../../core/interfaces/home.interfaces';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PatientService } from '../../core/services/patient.service';
import { IParams, IPatient } from '../../core/interfaces/patient.interfaces';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  listOfData: IPatient[] = [];
  listOfColumn = listOfColumn;
  mainCheckBox: boolean = false;
  isSelectedAllInvoices$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  s: Subscription[] = [];
  isCreateModal: boolean = false;

  public params$: BehaviorSubject<IParams> = new BehaviorSubject<IParams>({
    pageSize: 20,
    pageNumber: 0,
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private patientService: PatientService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.s.push(
      this.isSelectedAllInvoices$.subscribe({
        next: value => {
          if (this.mainCheckBox !== value) {
            this.mainCheckBox = value;
            this.cdr.detectChanges();
          }
        },
      })
    );
    this.s.push(
      this.params$.subscribe(res => {
        this.getPatients(res);
      })
    );
  }

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }

  getPatients(params: IParams) {
    this.s.push(
      this.patientService.getPatients(params).subscribe({
        next: value => {
          this.listOfData = value?.content.map(res => {
            return {
              ...res,
              isSelected: false,
              createdDate: new Date(res?.createdDate)
                .toISOString()
                .slice(0, 10),
              genderText: res?.gender === 'M' ? 'Мужской' : 'Женский',
            };
          });
        },
        error: err => {
          this.notification.show(
            'error',
            `Ошибка: ${err?.status}`,
            'Неизвестная ошибка'
          );
        },
      })
    );
  }

  selectAllBlock() {
    this.mainCheckBox = !this.mainCheckBox;
    this.isSelectedAllInvoices$.next(this.mainCheckBox);
    this.selectAll();
  }

  selectAll() {
    if (!!this.listOfData.length) {
      this.listOfData.map(item => (item.isSelected = this.mainCheckBox));
    }
    this.cdr.detectChanges();
  }

  singleSelectBlock(data: IPatient) {
    data.isSelected = !data.isSelected;
    this.singleSelect();
  }

  singleSelect() {
    this.isSelectedAllInvoices$.next(this.mainCheckBox);
    this.mainCheckBox = this.listOfData.every(item => item.isSelected === true);
    this.cdr.detectChanges();
  }

  handleModal() {
    this.isCreateModal = !this.isCreateModal;
  }

  actions(type: string, item: IPatient) {
    if (type === 'open') {
      this.router.navigate([`/patients/${item.id}`]);
    } else if (type === 'delete') {
    }
  }
}
