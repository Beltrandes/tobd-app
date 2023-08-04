import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './containers/tasks/tasks.component';
import { TaskFormComponent } from './containers/task-form/task-form.component';

const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'new', component: TaskFormComponent},
  {path: 'edit/:id', component: TaskFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
