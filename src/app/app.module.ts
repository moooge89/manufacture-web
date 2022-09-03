import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {IsLoggedInGuard} from "./guard/is-loggen-in.guard";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    IsLoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
