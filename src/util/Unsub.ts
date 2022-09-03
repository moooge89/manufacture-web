import {Subscription} from "rxjs";

export class Unsub {

  private _subs: Subscription[] = [];

  public set sub(sub: Subscription) {
    this._subs.push(sub);
  }

  public unsubscribe(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }

}
