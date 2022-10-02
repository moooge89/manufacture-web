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
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then(x => x.DepartmentsModule),
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then(x => x.WarehouseModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
