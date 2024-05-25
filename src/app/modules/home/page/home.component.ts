import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { filter, Subscription, tap } from 'rxjs';
import { LoginService } from '../../../core/services/login.service';
import { IUserInfo } from '../../../core/interfaces/login.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public time: string = 'month';
  public chart: any;
  public faqLists: string[] = [
    'Память',
    'Внимание',
    'Ориентация',
    'Обозначение',
    'Визуально-пространственные',
  ];
  public s: Subscription[] = [];
  public userInfo: IUserInfo = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.createPlot();
    this.s.push(
      this.loginService.userInfo$
        .pipe(
          filter(Boolean),
          tap(res => (this.userInfo = res))
        )
        .subscribe()
    );
  }
  ngOnDestroy(): void {}

  createPlot() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [
          'Янв',
          'Фев',
          'Март',
          'Апр',
          'Май',
          'Июнь',
          'Июль',
          'Авг',
          'Сен',
          'Окт',
          'Ноя',
          'Дек',
        ],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40, 40, 12, 70, 71, 90],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
