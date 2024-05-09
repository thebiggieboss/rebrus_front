export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  phone: string;
  role: string;
  profile: {
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: string;
    gender: string;
  };
}
