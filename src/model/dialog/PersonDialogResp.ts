import {Person} from "@model/person/Person";

export interface PersonDialogResp {
  needToSave: boolean;
  person: Person | undefined;
}
