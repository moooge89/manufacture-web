import {Person} from "@model/person/Person";

export class PersonDialogResp {
  readonly needToSave: boolean;
  readonly person: Person | undefined;

  constructor(private _needToSave: boolean,
              private _person: Person | undefined) {
    this.needToSave = _needToSave;
    this.person = _person;
  }

  static noNeedToSave(): PersonDialogResp {
    return new PersonDialogResp(false, undefined);
  }

  static save(person: Person): PersonDialogResp {
    return new PersonDialogResp(true, person);
  }

  doesNotNeedToSave(): boolean {
    return !this.needToSave;
  }

}
