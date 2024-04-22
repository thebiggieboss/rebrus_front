import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-patient-modal',
  templateUrl: './create-patient-modal.component.html',
  styleUrls: ['./create-patient-modal.component.scss'],
})
export class CreatePatientModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
