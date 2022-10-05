import {Component, Input} from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';

export class NotificationData {
  title: string;
  message: string;

  constructor(title: string, message: string) {
    this.title = title;
    this.message = message;
  }
}

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
}
