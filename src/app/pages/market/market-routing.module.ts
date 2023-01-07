import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarketComponent} from "./market.component";

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketRoutingModule {
}
