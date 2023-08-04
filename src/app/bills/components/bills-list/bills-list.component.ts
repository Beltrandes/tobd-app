import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Bill } from 'src/app/tasks/models/Bill';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss'],
})
export class BillsListComponent implements OnChanges {

  @Input() bills: Bill[] = []
  @Input() lateBillsCount: number = 0
  @Input() openBillsCount: number = 0
  @Input() paidBillsCount: number = 0
  @Input() balance: number = 0  
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  @Output() pay = new EventEmitter(false)
  @Output() remove = new EventEmitter(false)

  readonly displayedColumns: string[] = ['description', 'amount', 'dueDate', 'category', 'status', 'actions']

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges){
    if (changes['balance']) {
      this.cdr.detectChanges()
    }
  }

  onAdd() {
    this.add.emit(true)
  }

  onEdit(bill: Bill) {
    this.edit.emit(bill)
  }

  onPayment(bill: Bill) {
    this.pay.emit(bill)
  }

  onDelete(bill: Bill) {
    this.remove.emit(bill)
  }
}
