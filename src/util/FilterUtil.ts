import {MaterialFilter} from "@model/filter/MaterialFilter";
import {PersonFilter} from "@model/person/PersonFilter";

export function defaultFilter(): MaterialFilter {
  return {
    available: {
      min: undefined,
      max: undefined,
    },
    countries: [],
    departments: [],
    materialName: '',
    price: {
      min: undefined,
      max: undefined,
    }
  };
}

export function emptyUserFilter(): PersonFilter {
  return {
    personName: '',
    factoryIds: [],
    departmentIds: [],
  };
}
