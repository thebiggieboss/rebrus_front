export interface IPatientRes {
  content: IPatient[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface IPatient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  iin: string;
  phone: string;
  birthDate: string;
  gender: string;
  region: string;
  address: string;
  responsible: string;
  stageOfDementia: string;
  note: IPatientNote;
  assessments: IPatientAssessments[];
  appointments: IPatientAppointments[];
  files: IPatientFile[];
  createdDate: string;
  createdBy: number | null;
  isSelected?: boolean;
  genderText?: string;
}

export interface IPatientCreate {
  firstName: string;
  lastName: string;
  middleName: string;
  iin: string;
  phone: string;
  birthDate: string;
  gender: string;
  region: string;
  address: string;
  responsible: string;
}

export interface IPatientRes extends IPatientCreate {
  id: number | null;
  stageOfDementia: string | null;
  note: IPatientNote | null;
  assessments: IPatientAssessments[] | null;
  files: IPatientFile[] | null;
  createdDate: string | null;
  createdBy: number | null;
}

export interface IPatientNote {
  value: string;
  modifiedDate: string;
  modifiedBy: string;
}

export interface IPatientAssessments {
  type: string;
  point: number;
}

export interface IPatientFile {
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface IParams {
  pageSize: number;
  pageNumber: number;
}

export interface IPatientAppointments {
  date: string;
}
