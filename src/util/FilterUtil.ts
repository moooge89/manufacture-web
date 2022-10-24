import {MaterialFilter} from "@model/filter/MaterialFilter";

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
