import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrudPersonComponent} from "./crud-person.component";

const routes: Routes = [
  {
    path: '',
    component: CrudPersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudPersonRoutingModule {
}
