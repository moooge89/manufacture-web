import {NotificationType} from "./NotificationType";

export class NotificationData {

  title: string = '';
  message: string = '';
  type: NotificationType = NotificationType.INFO;

  constructor(init?: Partial<NotificationData>) {
    Object.assign(this, init);
  }

}
