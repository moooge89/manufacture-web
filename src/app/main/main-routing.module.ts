import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'factory',
        loadChildren: () => import('./factory/factory.module').then(x => x.FactoryModule),
      },
      {
        path: 'teams',
        loadChildren: () => import('./teams/teams.module').then(x => x.TeamsModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
