import { BillService } from './../../services/bill.service';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { Component } from '@angular/core';
import { Bill } from 'src/app/tasks/models/Bill';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent {
  bills$!: Observable<Bill[]>;

  lateBillsCount: number = 0;
  openBillsCount: number = 0;
  paidBillsCount: number = 0;

  balance: number = 0;

  private subscription: Subscription | undefined;

  bill: Bill | undefined;

  constructor(
    private billService: BillService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  refresh() {
    this.bills$ = this.billService.list().pipe(
      catchError(() => {
        this.onError('Error loading Bills.');
        return of([]);
      })
    );
    this.subscription = this.bills$.subscribe((bills) => {
      this.lateBillsCount = bills.filter(
        (bill) => bill.status === 'Late'
      ).length;
      this.openBillsCount = bills.filter(
        (bill) => bill.status === 'Pending'
      ).length;
      this.paidBillsCount = bills.filter(
        (bill) => bill.status === 'Paid'
      ).length;
      bills.forEach((bill) => {
        this.updateBalance(bill.amount, bill.status)

      });
    });

    this.checkDates();
  }

  checkDates() {
    this.bills$.subscribe((bills: Bill[]) => {
      const today = new Date();
      bills.forEach((bill: Bill) => {
        const dueDate = new Date(bill.dueDate);

        if (dueDate < today && bill.status !== 'Paid') {
          bill.status = 'Late';

          this.billService.updateStatus(bill, 'Late').subscribe();
        }
      });
    });
  }

  onError(errorMessage: string) {
    console.log(errorMessage)
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(bill: Bill) {
    this.router.navigate(['edit', bill._id], { relativeTo: this.route });
  }

  onPayment(bill: Bill) {
    if (bill.status == 'Paid') {
      this._snackBar.open('This Bill is already paid!', '', { duration: 3000 });
      return;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Confirm that the Bill has been paid?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.billService.updateStatus(bill, 'Paid').subscribe({
          next: (updatedBill) => {
            this._snackBar.open('Bill pays successfully!', 'X', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });

            this.updateBalance(updatedBill.amount, updatedBill.status)
            this.refresh()

          },
          error: (error) => {
            this._snackBar.open('Error trying to pay Bill!', '', {duration: 3000});
          },
          complete: () => {
          },
        });
      }
    });
  }

  updateBalance(amount: number, status: string) {
    if(status === 'Pending' || status === 'Late') {
      this.balance -= amount
    }
  }

  onRemove(bill: Bill) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Confirm that you want to delete the bill?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.billService.remove(bill._id).subscribe({
          next: () => {
            this.refresh();
            this._snackBar.open('Bill sucessfully deleted!', 'X', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          },
          error: (error) => {
            this._snackBar.open('Error paying the bill', '', {duration: 3000});
          },
          complete: () => {},
        });
      }
    });
  }
}
