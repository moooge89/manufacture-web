import {Subscription} from "rxjs";

export class Unsub {

  private _subs: Subscription[] = [];

  set sub(sub: Subscription) {
    this._subs.push(sub);
  }

  unsubscribe(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }

}
