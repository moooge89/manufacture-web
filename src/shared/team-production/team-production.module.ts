import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamProductionComponent} from "./team-production.component";

@NgModule({
  declarations: [TeamProductionComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    TeamProductionComponent
  ]
})
export class TeamProductionModule {
}
