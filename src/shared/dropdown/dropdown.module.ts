import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from "./dropdown.component";
import {InputModule} from "@shared/input/input.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";

@NgModule({
  declarations: [DropdownComponent],
  imports: [
    CommonModule,
    InputModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [
    DropdownComponent,
  ]
})
export class DropdownModule {
}
