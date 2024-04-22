import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ItemData } from '../../../core/interfaces/home.interfaces';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  listOfData: ItemData[] = [];
  mainCheckBox: boolean = false;
  isSelectedAllInvoices$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  s: Subscription[] = [];
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
      surname: `Edward King ${index}`,
      name: `Edward King ${index}`,
      iin: `Edward King ${index}`,
      gender: `Edward King ${index}`,
      creationDate: `Edward King ${index}`,
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
}
