import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  form: FormGroup

  task: Task | undefined

  private subscription: Subscription | undefined

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private taskService: TaskService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute

    ) {
      this.form = this.formBuilder.group({
        _id: [''],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
        category: ['', [Validators.required]],
        status: ['Pending']
      })

  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const taskId = params.get('id')
        if(taskId) {
          this.loadTask(taskId)
        }
      })
  }


  loadTask(taskId: string) {
    this.subscription = this.taskService.loadById(taskId).subscribe({
      next: (task: Task) => {
        this.task = task
        this.form.setValue({
          _id: task._id,
          description: task.description,
          category: task.category,
          status: 'Pending'
        })
      },
      error: () => {
        this._snackBar.open('Error loading Task data.', '', {duration: 3000})
      }
    })
  }


  onSubmit() {
    if(this.form.value.category !== 'null' && this.form.value.description !== '') {
      this.subscription = this.taskService.save(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => {
          console.log(this.form.value)
        }
      })
    } else {
      this._snackBar.open('Fill in all fields!', '', {duration: 3000})
    }
  }

  private onSuccess() {
    this._snackBar.open('Task sucessfully saved!', '', {duration: 3000})
    this.onCancel()
  }

  onCancel() {
    this.location.back();
  }

  private onError() {
    this._snackBar.open('Erro ao salvar Task!', '', {duration: 3000})
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName)

    if (field?.hasError('required')) {
      return 'Campo obrigatório!'
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 10
      return `Mínimo de caracteres: ${requiredLength}`
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 150
      return `Máximo de caracteres: ${requiredLength}`
    }

    return 'Campo inválido!!'
  }
}
