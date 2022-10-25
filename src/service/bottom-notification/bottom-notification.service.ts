import {Inject, Injectable, Injector} from "@angular/core";
import {BottomNotificationComponent} from "@shared/bottom-notification/bottom-notification.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {NotificationType} from "@model/bottom-notification/NotificationType";

@Injectable({providedIn: 'root'})
export class BottomNotificationService {

  private config: any = {
    toastComponent: BottomNotificationComponent,
    positionClass: 'toast-bottom-right',
    toastClass: 'toast',
    extendedTimeOut: 0,
    tapToDismiss: false,
    timeOut: 5000,
  };

  constructor(@Inject(Injector) private injector: Injector) {
  }

  public showError(message: string) {
    const toast = this.toast.show('', '', this.config);
    toast.toastRef.componentInstance.data = {
      title: 'Error',
      message: message,
      type: NotificationType.ERROR,
    };
  }

  public showHttpResponseErrorFor(err: Error) {
    if (!(err instanceof HttpErrorResponse)) {
      throw err;
    }

    const toast = this.toast.show('', '', {...this.config, timeOut: 0});

    const errMessage = typeof err?.error === 'string' ? JSON.parse(err?.error)?.message : err?.error.message;
    toast.toastRef.componentInstance.data = {
      title: 'Error',
      message: errMessage,
      type: NotificationType.ERROR,
    };
  }

  public showInfo(message: string) {
    const toast = this.toast.show('', '', this.config);
    toast.toastRef.componentInstance.data = {
      title: 'Info',
      message: message,
      type: NotificationType.INFO,
    };
  }

  private get toast(): ToastrService {
    return this.injector.get(ToastrService);
  }

}
