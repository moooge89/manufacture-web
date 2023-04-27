import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {LoadBudgetComponent} from "./load-budget.component";
import {LoadBudgetRoutingModule} from "./load-budget-routing.module";
import {ButtonModule} from "@shared/button/button.module";
import {InputModule} from "@shared/input/input.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [LoadBudgetComponent],
  imports: [
    CommonModule,
    LoadBudgetRoutingModule,
    ButtonModule,
    InputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  bootstrap: [LoadBudgetComponent]
})
export class LoadBudgetModule {
}
