import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FactoryComponent} from "./factory.component";

const routes: Routes = [
  {
    path: '',
    component: FactoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactoryRoutingModule {
}
