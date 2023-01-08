import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {CompanyGuard} from "../guard/company.guard";
import {AdminGuard} from "../guard/admin.guard";
import {CompanyFactoryGuard} from "../guard/company-factory.guard";
import {CommonPageGuard} from "../guard/common-page.guard";
import {DepartmentGuard} from "../guard/department.guard";
import {IsLoggedInGuard} from "../guard/is-loggen-in.guard";
import {FactoryGuard} from "../guard/factory.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'company',
        loadChildren: () => import('../pages/company/company.module').then(x => x.CompanyModule),
        canLoad: [CompanyGuard],
      },
      {
        path: 'factory',
        loadChildren: () => import('../pages/factory/factory.module').then(x => x.FactoryModule),
        canLoad: [CompanyFactoryGuard],
      },
      {
        path: 'departments',
        loadChildren: () => import('../pages/departments/departments.module').then(x => x.DepartmentsModule),
        canLoad: [FactoryGuard],
      },
      {
        path: 'warehouse',
        loadChildren: () => import('../pages/warehouse/warehouse.module').then(x => x.WarehouseModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'market',
        loadChildren: () => import('../pages/market/market.module').then(x => x.MarketModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'crud-market',
        loadChildren: () => import('../pages/create-market/create-market.module').then(x => x.CreateMarketModule),
        canLoad: [AdminGuard],
      },
      {
        path: 'budget',
        loadChildren: () => import('../pages/budget/budget.module').then(x => x.BudgetModule),
        canLoad: [DepartmentGuard],
      },
      {
        path: 'production',
        loadChildren: () => import('../pages/production/production.module').then(x => x.ProductionModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'report',
        loadChildren: () => import('../pages/report/report.module').then(x => x.ReportModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'user',
        loadChildren: () => import('../pages/person/person.module').then(x => x.PersonModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: '**',
        redirectTo: '',
        canLoad: [IsLoggedInGuard],
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
