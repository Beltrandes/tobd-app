import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './containers/diary/diary.component';
import { DiaryFormComponent } from './containers/diary-form/diary-form.component';

const routes: Routes = [
  { path:'', component: DiaryComponent },
  { path: 'new', component: DiaryFormComponent},
  { path: 'edit/:id', component: DiaryFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
