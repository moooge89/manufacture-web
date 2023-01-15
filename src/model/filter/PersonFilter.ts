import {Filter} from "@model/filter/Filter";

export class PersonFilter implements Filter {

  personName: string = '';

  factoryIds: string[] = [];

  departmentIds: string[] = [];

}
