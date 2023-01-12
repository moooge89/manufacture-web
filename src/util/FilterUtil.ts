import {MaterialFilter} from "@model/filter/MaterialFilter";
import {PersonFilter} from "@model/person/PersonFilter";
import {FilterElement} from "@model/filter/FilterElement";

export function emptyMaterialFilter(): MaterialFilter {
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

export const getIdFromFe = (element: FilterElement) => element.id;

export const getNameFromFe = (element: FilterElement) => element.name;
