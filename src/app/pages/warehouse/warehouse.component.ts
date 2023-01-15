import {Component, OnDestroy, OnInit} from '@angular/core';
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarehouseController} from "@controller/WarehouseController";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {MaterialDialogComponent} from "../../dialogue/material/material-dialog.component";
import {Subject} from "rxjs";
import {MaterialFilterReactor} from "@model/filter/reactor/MaterialFilterReactor";
import {Unsub} from "@util/Unsub";
import {FilterDescription} from "@model/filter/FilterDescription";
import {FilterInputDescription} from "@model/filter/FilterInputDescription";
import {FilterFieldType} from "@model/filter/FilterFieldType";
import {FilterDropdownDescription} from "@model/filter/FilterDropdownDescription";
import {FilterElement} from "@model/filter/FilterElement";
import {FilterNumberRangeDescription} from "@model/filter/FilterNumberRangeDescription";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {DepartmentController} from "@controller/DepartmentController";
import {debounceTime, filter} from "rxjs/operators";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, OnDestroy {

  materials$ = this.warehouseController.loadWarehouseMaterials(new MaterialFilter());

  panelOpenState = false;

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<MaterialFilter>();
  private readonly filterReactor = new MaterialFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<MaterialDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly warehouseController: WarehouseController,
              private readonly departmentController: DepartmentController,) {
  }

  ngOnInit() {

    this.initDescriptions();

    this.unsub.sub = this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.materials$ = this.warehouseController.loadWarehouseMaterials(filter));

  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  isMatIcon = (index: number) => index === 0;

  onRowClick(material: WarehouseMaterial): void {
    this.dialogRef?.close();
    this.dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: material},
    });
  }

  private initDescriptions(): void {
    const nameDesc: FilterInputDescription = {
      fieldType: FilterFieldType.INPUT,
      placeholder: 'Name...',
      onValueChange: this.filterReactor.onNameChange,
    };

    const availableDesc: FilterNumberRangeDescription = {
      fieldType: FilterFieldType.NUMBER_RANGE,
      title: 'Available',
      onValueChange: this.filterReactor.onAvailableChange,
    };

    const departmentDesc: FilterDropdownDescription<FilterElement> = {
      elements$: this.departmentController.loadDepartmentsAsFilterElements(),
      fieldType: FilterFieldType.DROPDOWN,
      getId: getIdFromFe,
      getName: getNameFromFe,
      label: 'Department...',
      onValueChange: this.filterReactor.onDepartmentsChange,
    };

    this.descriptions.push(nameDesc, availableDesc, departmentDesc);
  }

  get headers(): string[] {
    return ['Icon', 'Material name', 'Available (kg)', 'Used in'];
  }

  get columnNames(): string[] {
    return ['icon', 'name', 'available', 'usedIn'];
  }

}
