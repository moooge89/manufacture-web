import {NgModule} from '@angular/core';
import {MainComponent} from "./main.component";
import {MainRoutingModule} from "./main-routing.module";
import {CommonModule} from "@angular/common";
import {MenuModule} from "@shared/menu/menu.module";
import {MatDialogModule} from "@angular/material/dialog";
import {AdminGuard} from "../guard/admin.guard";
import {CommonPageGuard} from "../guard/common-page.guard";
import {CompanyGuard} from "../guard/company.guard";
import {CompanyFactoryGuard} from "../guard/company-factory.guard";
import {FactoryDepartmentGuard} from "../guard/factory-department.guard";
import {DepartmentGuard} from "../guard/department.guard";
import {FactoryGuard} from "../guard/factory.guard";
import {
  PersonFactoryTransferDialogModule
} from "../dialogue/person-factory-transfer/person-factory-transfer-dialog.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MenuModule,
    MatDialogModule,
  ],
  providers: [
    AdminGuard,
    CommonPageGuard,
    CompanyGuard,
    CompanyFactoryGuard,
    DepartmentGuard,
    FactoryDepartmentGuard,
    FactoryGuard,
    PersonFactoryTransferDialogModule,
  ],
  bootstrap: [MainComponent]
})
export class MainModule {
}
