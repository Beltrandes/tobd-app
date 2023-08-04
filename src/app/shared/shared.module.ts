import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './material/app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { DateFormatePipe } from './pipes/date-formate.pipe';
import { CategoryPipe } from './pipes/category.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { AmountFormatePipe } from './pipes/amount-formate.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ConfirmationDialogComponent,
    MainToolbarComponent,
    DateFormatePipe,
    CategoryPipe,
    StatusPipe,
    AmountFormatePipe,
    
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports: [MainToolbarComponent, DateFormatePipe, CategoryPipe, StatusPipe, AmountFormatePipe, AppMaterialModule]
})
export class SharedModule { }
