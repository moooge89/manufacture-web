import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {DepartmentsComponent} from "./departments.component";
import {DepartmentsRoutingModule} from "./departments-routing.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [DepartmentsComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MatIconModule,
    DragDropModule,
    MatSlideToggleModule,
  ],
  bootstrap: [DepartmentsComponent]
})
export class DepartmentsModule {
}
