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
import {MaterialDialogModule} from "@shared/material-dialog/material-dialog.module";
import {MarketMaterialDialogModule} from "@shared/market-material-dialog/market-material-dialog.module";

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
    MaterialDialogModule,
    MarketMaterialDialogModule,
  ],
  providers: [
    IsLoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
