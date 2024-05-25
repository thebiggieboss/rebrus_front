import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  public s: Subscription[] = [];
  public searchTerm: string = '';
  public selectedDate: Date;

  public listOfData: any[] = [
    {
      lastName: 'Brown',
      firstName: 'John ',
      visits: '25.05.2024',
      isAbsent: true,
      isAttending: false,
    },
    {
      lastName: 'Aidar',
      firstName: 'Hu',
      visits: '13.05.2024',
      isAbsent: false,
      isAttending: true,
    },
    {
      lastName: 'Nua',
      firstName: 'Hasf',
      visits: '11.05.2024',
      isAbsent: true,
      isAttending: false,
    },
  ];
  listOfDisplayData = [...this.listOfData];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }

  searchByName(value: string): any[] {
    const lowerCaseValue = value.trim().toLowerCase();
    return this.listOfData.filter(item => {
      const fullName = `${item.lastName} ${item.firstName}`.toLowerCase();
      const firstName = item.firstName.toLowerCase();
      return (
        fullName.includes(lowerCaseValue) || firstName.includes(lowerCaseValue)
      );
    });
  }

  searchByDate(selectedDate: Date): any[] {
    const selectedDateString = selectedDate
      ? this.formatDate(selectedDate)
      : '';
    return this.listOfData.filter(item => {
      const itemDate = item.visits; // Предполагается, что даты в формате "dd.mm.yyyy"
      return itemDate === selectedDateString;
    });
  }

  onSearch(event: Event | string) {
    let targetValue = '';
    if (typeof event === 'string') {
      targetValue = event;
    } else {
      targetValue = (event?.target as HTMLInputElement)?.value || '';
    }

    const value = targetValue.trim();
    const nameResults = this.searchByName(value);
    const dateResults = this.searchByDate(this.selectedDate);

    this.listOfDisplayData = [...nameResults, ...dateResults];
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  onDateChange(date: Date): void {
    console.log(date);
    this.selectedDate = date;
    this.onSearch('');
  }
}
