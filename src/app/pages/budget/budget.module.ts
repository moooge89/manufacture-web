import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BudgetComponent} from "./budget.component";
import {BudgetRoutingModule} from "./budget-routing.module";
import {ButtonModule} from "@shared/button/button.module";
import {InputModule} from "@shared/input/input.module";

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ButtonModule,
    InputModule,
  ],
  bootstrap: [BudgetComponent]
})
export class BudgetModule {
}
