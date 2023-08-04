import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './containers/bills/bills.component';
import { BillsFormComponent } from './containers/bills-form/bills-form.component';

const routes: Routes = [
  {path: '', component: BillsComponent},
  {path: 'new', component: BillsFormComponent},
  {path: 'edit/:id', component: BillsFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
