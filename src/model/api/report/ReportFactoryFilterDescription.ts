import {FilterElement} from "@model/filter/FilterElement";
import {ReportDepartmentFilterDescription} from "./ReportDepartmentFilterDescription";

export interface ReportFactoryFilterDescription {
  filterElement: FilterElement;
  departments: ReportDepartmentFilterDescription[];
}
