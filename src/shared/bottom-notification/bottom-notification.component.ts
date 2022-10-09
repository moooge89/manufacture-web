import {Component, Input} from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';
import {NotificationData} from "@model/bottom-notification/NotificationData";
import {NotificationType} from "@model/bottom-notification/NotificationType";

@Component({
  templateUrl: './bottom-notification.component.html',
  styleUrls: ['./bottom-notification.component.scss'],
})
export class BottomNotificationComponent extends Toast {

  @Input() data: NotificationData | undefined;

  constructor(
    protected toast: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toast, toastPackage);
  }

  close() {
    this.toast.clear(this.toastPackage.toastId);
  }

  get isInfo(): boolean {
    return this.data?.type === NotificationType.INFO;
  }

  get isError(): boolean {
    return this.data?.type === NotificationType.ERROR;
  }

}
