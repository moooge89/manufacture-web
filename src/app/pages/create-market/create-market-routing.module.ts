import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateMarketComponent} from "./create-market.component";

const routes: Routes = [
  {
    path: '',
    component: CreateMarketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMarketRoutingModule {
}
