import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit, OnDestroy {
  public email: string = 'ul****@gmail.com';
  public timer: string = '03:48';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onOtpChange(event: string) {
    console.log(event);
  }

  submit() {}
}
