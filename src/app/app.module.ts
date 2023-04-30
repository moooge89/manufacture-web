import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {IsLoggedInGuard} from "./guard/is-loggen-in.guard";
import {AppRoutingModule} from "./app-routing.module";
import {environment} from "../environments/environment";
import {HttpServiceModule} from "@service/http/http-service.module";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BottomNotificationModule} from "@shared/bottom-notification/bottom-notification.module";
import {ToastNoAnimationModule, ToastrModule} from "ngx-toastr";
import {CrudMarketMaterialDialogModule} from "./dialogue/crud-market-material/crud-market-material-dialog.module";
import {ConfirmationModule} from "./dialogue/confirmation/confirmation.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ReportDialogModule} from "./dialogue/report/report-dialog.module";
import {CrudPersonDialogModule} from "./dialogue/crud-person/crud-person-dialog.module";
import {ManufactureDialogModule} from "./dialogue/manufacture/manufacture-dialog.module";
import {WarehouseDialogModule} from "./dialogue/warehouse/warehouse-dialog.module";
import {MarketDialogModule} from "./dialogue/market/market-dialog.module";
import {AnalyticsDialogModule} from "./dialogue/analytics/analytics-dialog.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpServiceModule.forRoot(environment.urlPrefix),
    BrowserAnimationsModule,
    MatDialogModule,
    WarehouseDialogModule,
    MarketDialogModule,
    BottomNotificationModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    ReportDialogModule,
    CrudMarketMaterialDialogModule,
    CrudPersonDialogModule,
    ManufactureDialogModule,
    ConfirmationModule,
    AnalyticsDialogModule,
  ],
  providers: [
    IsLoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
