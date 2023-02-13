import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BudgetComponent} from "./budget.component";
import {BudgetRoutingModule} from "./budget-routing.module";
import {ButtonModule} from "@shared/button/button.module";
import {InputModule} from "@shared/input/input.module";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    ButtonModule,
    InputModule,
    MatInputModule,
    FormsModule,
  ],
  bootstrap: [BudgetComponent]
})
export class BudgetModule {
}
