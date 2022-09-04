import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {InputModule} from "../../shared/input/input.module";
import {ButtonModule} from "../../shared/button/button.module";

@NgModule({
  declarations: [AuthComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        InputModule,
        ButtonModule,
    ],
})
export class AuthModule {
}
