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
import {MaterialDialogModule} from "./dialogue/material/material-dialog.module";
import {MarketMaterialDialogModule} from "./dialogue/market-material/market-material-dialog.module";
import {CrudPersonDialogModule} from "./dialogue/crud-person/crud-person-dialog.module";

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
    MaterialDialogModule,
    MarketMaterialDialogModule,
    BottomNotificationModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    ReportDialogModule,
    CrudMarketMaterialDialogModule,
    CrudPersonDialogModule,
    ConfirmationModule,
  ],
  providers: [
    IsLoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
