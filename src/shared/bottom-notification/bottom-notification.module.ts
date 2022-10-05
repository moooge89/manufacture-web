import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottomNotificationComponent} from "./bottom-notification.component";
import {BottomNotificationService} from "@service/bottom-notification/bottom-notification.service";

@NgModule({
  declarations: [BottomNotificationComponent],
  imports: [
    CommonModule
  ],
  providers: [BottomNotificationService],
})
export class BottomNotificationModule {
}
