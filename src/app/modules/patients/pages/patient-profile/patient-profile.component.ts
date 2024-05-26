import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from '../../../../core/services/patient.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPatient } from '../../../../core/interfaces/patient.interfaces';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit, OnDestroy {
  public s: Subscription[] = [];
  public patientInfo: IPatient = null;

  constructor(
    private patientService: PatientService,
    private notification: NotificationService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(res => {
      const id = res['id'];
      if (!id) {
        this.route.navigate(['/patients']);
      } else {
        this.getPatient(id);
      }
    });
  }

  ngOnDestroy() {
    this.s.forEach(s => s.unsubscribe());
  }

  getPatient(id: number) {
    this.s.push(
      this.patientService.getPatientById(id).subscribe({
        next: value => {
          this.patientInfo = value;
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
}
