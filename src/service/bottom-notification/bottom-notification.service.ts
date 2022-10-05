import {Inject, Injectable, Injector} from "@angular/core";
import {BottomNotificationComponent, NotificationData} from "@shared/bottom-notification/bottom-notification.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({providedIn: 'root'})
export class BottomNotificationService {

  config: any = {
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
    toast.toastRef.componentInstance.data = new NotificationData('Error', message);
  }

  public showHttpResponseErrorFor(err: Error) {
    if (!(err instanceof HttpErrorResponse)) {
      throw err;
    }

    const toast = this.toast.show('', '', {...this.config, timeOut: 0});

    const errMessage = typeof err?.error === 'string' ? JSON.parse(err?.error)?.message : err?.error.message;
    toast.toastRef.componentInstance.data = new NotificationData('Error', errMessage);
  }

  public showInfo(message: string) {
    const toast = this.toast.show('', '', this.config);
    toast.toastRef.componentInstance.data = new NotificationData('Info', message);
  }

  private get toast(): ToastrService {
    return this.injector.get(ToastrService);
  }

}
