import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './containers/diary/diary.component';
import { DiaryListComponent } from './components/diary-list/diary-list.component';
import { AppMaterialModule } from '../shared/material/app-material/app-material.module';
import { DiaryFormComponent } from './containers/diary-form/diary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    DiaryComponent,
    DiaryListComponent,
    DiaryFormComponent,
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule,
    DatePipe

  ],

})
export class DiaryModule { }
