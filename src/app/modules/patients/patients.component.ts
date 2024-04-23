import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { listOfColumn } from '../../core/helpers';
import { ItemData } from '../../core/interfaces/home.interfaces';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  listOfData: ItemData[] = [];
  listOfColumn = listOfColumn;
  mainCheckBox: boolean = false;
  isSelectedAllInvoices$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  s: Subscription[] = [];
  isCreateModal: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.s.push(
      this.isSelectedAllInvoices$.subscribe({
        next: value => {
          if (this.mainCheckBox !== value) {
            this.mainCheckBox = value;
            this.cdr.detectChanges();
          }
        },
      })
    );
    this.listOfData = new Array(10).fill(0).map((_, index) => ({
      id: index,
      surname: `Сергеев ${index}`,
      name: `Сергей ${index}`,
      iin: `91020150030${index}`,
      gender: index % 2 === 0 ? 'Мужской' : 'Женский',
      creationDate: `20.12.202${index}`,
      isSelected: false,
    }));
  }
  ngOnDestroy(): void {
    this.s.forEach(s => s.unsubscribe());
  }
  selectAllBlock() {
    this.mainCheckBox = !this.mainCheckBox;
    this.isSelectedAllInvoices$.next(this.mainCheckBox);
    this.selectAll();
  }
  selectAll() {
    if (!!this.listOfData.length) {
      this.listOfData.map(item => (item.isSelected = this.mainCheckBox));
    }
    this.cdr.detectChanges();
  }
  singleSelectBlock(data: ItemData) {
    data.isSelected = !data.isSelected;
    this.singleSelect();
  }
  singleSelect() {
    this.isSelectedAllInvoices$.next(this.mainCheckBox);
    this.mainCheckBox = this.listOfData.every(item => item.isSelected === true);
    this.cdr.detectChanges();
  }
  handleModal() {
    this.isCreateModal = !this.isCreateModal;
  }
}
