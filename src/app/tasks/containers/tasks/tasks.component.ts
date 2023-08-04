import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/Task';
import { Observable, catchError, of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  tasks$!: Observable<Task[]>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { this.refresh() }

  refresh() {
    this.tasks$ = this.taskService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar tasks.')
          return of([])
        })
      )
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    })
  }



  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(task: Task) {
    this.router.navigate(['edit', task._id], {relativeTo: this.route})
  }

  onRemove(task: Task) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Confirm that you have completed the Task?'
    })
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.remove(task._id).subscribe({
          next: () => {
            this.refresh()
            this._snackBar.open('Task done sucessfully!', 'X', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            })
          },
          error: error => {
            this.onError('Error completing task!')
          },
          complete: () => {}
        })
      }
    })
  }
}
