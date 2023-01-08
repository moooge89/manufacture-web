import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonComponent} from "./person.component";

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {
}
