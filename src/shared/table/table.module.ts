import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from "@shared/table/table.component";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule {
}
