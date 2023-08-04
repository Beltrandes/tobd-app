import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BillService } from '../../services/bill.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/tasks/models/Bill';

@Component({
  selector: 'app-bills-form',
  templateUrl: './bills-form.component.html',
  styleUrls: ['./bills-form.component.scss'],
})
export class BillsFormComponent implements OnInit {
  form: FormGroup;

  bill: Bill | undefined

  private subscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private billService: BillService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      category: ['', [Validators.required]],
      status: ['Pending', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const billId = params.get('id')
      if(billId) {
        this.loadBill(billId)
      }
    })
  }

  loadBill(billId: string) {
    this.subscription = this.billService.loadById(billId).subscribe({
      next: (bill: Bill) => {
        this.bill = bill
        this.form.setValue({
          _id: bill._id,
          description: bill.description,
          amount: bill.amount,
          dueDate: bill.dueDate,
          category: bill.category,
          status: bill.status,
        })
      },
      error: () => {
        this._snackBar.open('Error loading Bill data.', '', {duration: 3000})
      }
    })
  }

  onSubmit() {
    if (
      this.form.value.description !== '' &&
      this.form.value.category !== 'null' &&
      this.form.value.status !== 'null' &&
      this.form.value.amount !== ''
    ) {
      this.subscription = this.billService.save(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => {},
      });
    } else {
      this._snackBar.open('Fill in all fields!', '', { duration: 3000 });
    }
  }

  private onSuccess() {
    this._snackBar.open('Bill successfully saved!', '', {duration: 3000})
    this.onCancel()
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Error saving Bill!', '', {duration: 3000})
  }
}
