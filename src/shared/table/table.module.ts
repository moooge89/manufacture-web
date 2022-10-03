import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from "@shared/table/table.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule {
}
