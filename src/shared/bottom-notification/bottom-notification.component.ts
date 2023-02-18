import {Component, Input} from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';
import {NotificationData} from "@model/bottom-notification/NotificationData";
import {NotificationType} from "@model/bottom-notification/NotificationType";

@Component({
  templateUrl: './bottom-notification.component.html',
  styleUrls: ['./bottom-notification.component.scss'],
})
export class BottomNotificationComponent extends Toast {

  @Input() data: NotificationData = new NotificationData();

  constructor(
    protected toast: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toast, toastPackage);
  }

  close(): void {
    this.toast.clear(this.toastPackage.toastId);
  }

  isInfo(): boolean {
    return this.data.type === NotificationType.INFO;
  }

  isError(): boolean {
    return this.data.type === NotificationType.ERROR;
  }

}
