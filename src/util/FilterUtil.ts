import {FilterElement} from "@model/filter/FilterElement";

export const getIdFromFe = (element: FilterElement) => element.id;

export const getNameFromFe = (element: FilterElement) => element.displayValue;
