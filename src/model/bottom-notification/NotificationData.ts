import {NotificationType} from "./NotificationType";

export class NotificationData {

  public title: string = '';
  public message: string = '';
  public type: NotificationType = NotificationType.INFO;

  public constructor(init?: Partial<NotificationData>) {
    Object.assign(this, init);
  }

}
