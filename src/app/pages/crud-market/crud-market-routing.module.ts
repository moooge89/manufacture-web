import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrudMarketComponent} from "./crud-market.component";

const routes: Routes = [
  {
    path: '',
    component: CrudMarketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudMarketRoutingModule {
}
