import {MaterialFilter} from "@model/filter/MaterialFilter";
import {PersonFilter} from "@model/filter/PersonFilter";
import {FilterElement} from "@model/filter/FilterElement";

// todo era remove
export function emptyMaterialFilter(): MaterialFilter {
  return new MaterialFilter();
}

// todo era remove
export function emptyPersonFilter(): PersonFilter {
  return new PersonFilter();
}

export const getIdFromFe = (element: FilterElement) => element.id;

export const getNameFromFe = (element: FilterElement) => element.name;
