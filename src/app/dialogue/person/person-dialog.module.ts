import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonDialogComponent} from "./person-dialog.component";

@NgModule({
  declarations: [PersonDialogComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    PersonDialogComponent,
  ]
})
export class PersonDialogModule {
}
