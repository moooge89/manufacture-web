import {Person} from "@model/person/Person";

export class PersonDialogResp {
  needToSave: boolean = false;
  person: Person | undefined;

  constructor(init?: Partial<PersonDialogResp>) {
    Object.assign(this, init);
  }

  static noNeedToSave(): PersonDialogResp {
    return new PersonDialogResp({needToSave: false});
  }

  static save(person: Person): PersonDialogResp {
    return new PersonDialogResp({needToSave: true, person: person});
  }

  doesNotNeedToSave(): boolean {
    return !this.needToSave;
  }

}
