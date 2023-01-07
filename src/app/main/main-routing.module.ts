import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {CompanyGuard} from "../guard/company.guard";
import {AdminGuard} from "../guard/admin.guard";
import {CompanyFactoryGuard} from "../guard/company-factory.guard";
import {FactoryDepartmentGuard} from "../guard/factory-department.guard";
import {CommonPageGuard} from "../guard/common-page.guard";
import {DepartmentGuard} from "../guard/department.guard";
import {IsLoggedInGuard} from "../guard/is-loggen-in.guard";

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
        loadChildren: () => import('./factory/factory.module').then(x => x.FactoryModule),
        canLoad: [CompanyFactoryGuard],
      },
      {
        path: 'departments',
        loadChildren: () => import('./departments/departments.module').then(x => x.DepartmentsModule),
        canLoad: [FactoryDepartmentGuard],
      },
      {
        path: 'warehouse',
        loadChildren: () => import('./warehouse/warehouse.module').then(x => x.WarehouseModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'market',
        loadChildren: () => import('./market/market.module').then(x => x.MarketModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'crud-market',
        loadChildren: () => import('../pages/create-market/create-market.module').then(x => x.CreateMarketModule),
        canLoad: [AdminGuard],
      },
      {
        path: 'budget',
        loadChildren: () => import('./budget/budget.module').then(x => x.BudgetModule),
        canLoad: [DepartmentGuard],
      },
      {
        path: 'production',
        loadChildren: () => import('./production/production.module').then(x => x.ProductionModule),
        canLoad: [CommonPageGuard],
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(x => x.ReportModule),
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
