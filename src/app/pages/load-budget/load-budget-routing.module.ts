import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoadBudgetComponent} from "./load-budget.component";

const routes: Routes = [
  {
    path: '',
    component: LoadBudgetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadBudgetRoutingModule {
}
