import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss'],
})
export class PushComponent implements OnInit {
  @ViewChild('template') template!: TemplateRef<void>;

  constructor() {}

  ngOnInit(): void {}
}
