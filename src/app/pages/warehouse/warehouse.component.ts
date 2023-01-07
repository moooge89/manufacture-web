import {Component, OnDestroy} from '@angular/core';
import {WarehouseMaterial} from "@model/api/material/WarehouseMaterial";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WarehouseController} from "@controller/WarehouseController";
import {MaterialFilterMetaInfo} from "@model/filter/MaterialFilterMetaInfo";
import {defaultFilter} from "@util/FilterUtil";
import {MaterialFilter} from "@model/filter/MaterialFilter";
import {MaterialDialogComponent} from "../../dialogue/material/material-dialog.component";

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnDestroy {

  materials$ = this.warehouseController.loadWarehouseMaterials(defaultFilter());

  panelOpenState = false;

  filterMetaInfo: MaterialFilterMetaInfo = {
    useAvailable: true,
    useCountries: false,
    useDepartments: true,
    useMaterialName: true,
    usePrice: false,
  };

  private dialogRef: MatDialogRef<MaterialDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog,
              private readonly warehouseController: WarehouseController,) {
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  isMatIcon = (index: number) => {
    return index === 0;
  }

  onRowClick(material: WarehouseMaterial): void {
    this.dialogRef?.close();
    this.dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '720px',
      height: '320px',
      data: {material: material},
    });
  }

  onFilterChange(filter: MaterialFilter): void {
    this.materials$ = this.warehouseController.loadWarehouseMaterials(filter);
  }

}
