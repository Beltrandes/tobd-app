import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BillsRoutingModule } from './bills-routing.module';
import { BillsComponent } from './containers/bills/bills.component';
import { AppMaterialModule } from '../shared/material/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { BillsListComponent } from './components/bills-list/bills-list.component';
import { BillsFormComponent } from './containers/bills-form/bills-form.component';



@NgModule({
  declarations: [
    BillsComponent,
    BillsListComponent,
    BillsFormComponent,

  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],

    providers: []
})
export class BillsModule { }
