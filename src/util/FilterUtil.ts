import {MaterialFilter} from "@model/filter/MaterialFilter";
import {PersonFilter} from "@model/person/PersonFilter";

// todo era rename
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

export function emptyPersonFilter(): PersonFilter {
  return {
    personName: '',
    factoryIds: [],
    departmentIds: [],
  };
}
