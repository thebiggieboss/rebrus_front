import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss'],
})
export class WelcomeModalComponent implements OnInit {
  @Input() isVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleOk() {
    localStorage.setItem('welcome-modal', '1');
    this.isVisible = false;
  }
}
