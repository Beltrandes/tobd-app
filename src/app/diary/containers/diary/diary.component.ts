import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Diary } from 'src/app/tasks/models/Diary';
import { DiaryService } from '../../services/diary.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent {
  diarys$!: Observable<Diary[]>;

  constructor(private diaryService: DiaryService, private _snackBar: MatSnackBar, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.refresh();
  }

  refresh() {
    this.diarys$ = this.diaryService.list().pipe(
      catchError(() => {
        this.onError('Erro ao carregar os Diarys.');
        return of([]);
      })
    );
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(diary: Diary) {
    this.router.navigate(['edit', diary._id], { relativeTo: this.route });
  }

  onRemove(diary: Diary) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Confirma que quer deletar este Diary?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.diaryService.remove(diary._id).subscribe({
          next: () => {
            this.refresh();
            this._snackBar.open('Diary deletado com sucesso!', 'X', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          },
          error: () => {
            this.onError('Erro ao tentar deletar o Diary!');
          },
          complete: () => {},
        });
      }
    });
  }

  onMark(diary: Diary) {
    const newStatus = diary.status === 'Unmarked' ? 'Marked' : 'Unmarked';

    this.diaryService.updateStatus(diary, newStatus).subscribe({
      next: () => {
        this.refresh();
        diary.status = newStatus;
      },
      error: () => {
        this._snackBar.open(`Error ${newStatus === 'Marked' ? 'Mark Diary' : 'Unmark Diary'}!`, 'X', { duration: 3000 });
      }
    });
  }


}
