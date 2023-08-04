import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { AppMaterialModule } from '../shared/material/app-material/app-material.module';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './containers/task-form/task-form.component';
import { TasksComponent } from './containers/tasks/tasks.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    TasksListComponent,
    TaskFormComponent,
    TasksComponent,

  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [TasksListComponent]
})
export class TasksModule { }
