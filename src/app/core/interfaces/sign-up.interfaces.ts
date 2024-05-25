export interface ISignUpRes {
  request_number: string;
  expiration_date: string;
  created_date: string;
}

export interface IOtpSend {
  request_number: string;
  expiration_date: string;
  created_date: string;
  email: string;
}

export interface IResendCode extends ISignUpRes {}

export interface IResOtp {
  access_token: string;
  refresh_token: string;
}

export interface IOtpCode extends ISignUpRes {
  code: string;
}
