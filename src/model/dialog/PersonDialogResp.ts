import {Person} from "@model/person/Person";

export class PersonDialogResp {
  public needToSave: boolean = false;
  public person: Person | undefined;

  public constructor(init?: Partial<PersonDialogResp>) {
    Object.assign(this, init);
  }

  public static noNeedToSave(): PersonDialogResp {
    return new PersonDialogResp({needToSave: false});
  }

  public static save(person: Person): PersonDialogResp {
    return new PersonDialogResp({needToSave: true, person: person});
  }

  public doesNotNeedToSave(): boolean {
    return !this.needToSave;
  }

}
