import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BudgetRequestComponent} from "./budget-request.component";
import {BudgetRequestRoutingModule} from "./budget-request-routing.module";

@NgModule({
  declarations: [BudgetRequestComponent],
  imports: [
    CommonModule,
    BudgetRequestRoutingModule,
  ],
  bootstrap: [BudgetRequestComponent]
})
export class BudgetRequestModule {
}
