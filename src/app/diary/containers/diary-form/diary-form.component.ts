import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DiaryService } from '../../services/diary.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diary } from 'src/app/tasks/models/Diary';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss']
})
export class DiaryFormComponent implements OnInit {
  form: FormGroup

  diary: Diary | undefined

  subscription: Subscription | undefined

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private route: ActivatedRoute, private location: Location, private diaryService: DiaryService) {
    this.form = this.formBuilder.group({
      _id: [''],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      date: [new Date()],
      text: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(1000)]],
      status: ['Unmarked']
    })
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const diaryId = params.get('id')
        if (diaryId) {
          this.loadDiary(diaryId)
        }
      })
  }

  loadDiary(diaryId: string) {
    this.subscription = this.diaryService.loadById(diaryId).subscribe({
      next: (diary: Diary) => {
        this.diary = diary
        this.form.setValue({
          _id: diary._id,
          description: diary.description,
          text: diary.text,
          date: diary.date,
          status: diary.status

        })
      },
      error: () => {
        this._snackBar.open('Erro ao carregar os dados.', '', {duration: 3000})
      }
    })
  }



  onSubmit() {
    if(this.form.value.description !== '' && this.form.value.text !== '') {
      this.subscription = this.diaryService.save(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => {}
      })
    } else {
      this._snackBar.open('Fill in all fields!', 'X', {duration: 3000})
    }
  }

  private onSuccess() {
    this._snackBar.open('Diary sucessfully saved!', 'X', {duration: 3000})
    this.onCancel()
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Error saving Diary!', '', {duration: 3000})
  }


  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName)

    if (field?.hasError('required')) {
      return 'Required field!'
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 10
      return `Minimum length: ${requiredLength}`
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 150
      return `Maximum length: ${requiredLength}`
    }

    return 'Invalid Field!'
  }

}
