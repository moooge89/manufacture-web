import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BudgetRequestComponent} from "./budget-request.component";

const routes: Routes = [
  {
    path: '',
    component: BudgetRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BudgetRequestRoutingModule {
}
