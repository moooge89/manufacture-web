import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductionComponent} from "./production.component";

const routes: Routes = [
  {
    path: '',
    component: ProductionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {
}
