import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IParams,
  IPatient,
  IPatientCreate,
  IPatientRes,
} from '../interfaces/patient.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getPatients(params: IParams): Observable<IPatientRes> {
    return this.http.get<IPatientRes>(
      `${this.baseUrl}/patient-management/patients`,
      {
        params: {
          ...params,
        },
      }
    );
  }

  createPatient(body: IPatientCreate): Observable<IPatient> {
    return this.http.post<IPatient>(
      `${this.baseUrl}/patient-management/patient`,
      body
    );
  }

  getPatientById(id: number): Observable<IPatient> {
    return this.http.get<IPatient>(
      `${this.baseUrl}/patient-management/patient/${id}`
    );
  }
}
