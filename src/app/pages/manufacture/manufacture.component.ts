import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {Unsub} from "@util/Unsub";
import {FilterDescription} from "@model/filter/description/FilterDescription";
import {FilterNumberRangeDescription} from "@model/filter/description/FilterNumberRangeDescription";
import {debounceTime, filter} from "rxjs/operators";
import {ManufactureController} from "@controller/ManufactureController";
import {ManufactureFilter} from "@model/filter/ManufactureFilter";
import {ManufactureFilterReactor} from "@model/filter/reactor/ManufactureFilterReactor";
import {Manufacture} from "@model/manufacture/Manufacture";
import {FilterDropdownDescription} from "@model/filter/description/FilterDropdownDescription";
import {FilterElement} from "@model/filter/FilterElement";
import {getIdFromFe, getNameFromFe} from "@util/FilterUtil";
import {ManufactureDialogComponent} from "../../dialogue/manufacture/manufacture-dialog.component";
import {Sorting} from "@model/web/Sorting";

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss']
})
export class ManufactureComponent implements OnInit, OnDestroy {

  manufactures$ = this.manufactureController.loadManufactureRows(new ManufactureFilter());

  panelOpenState = false;

  descriptions: FilterDescription[] = [];

  private readonly filterChangedSubject = new Subject<ManufactureFilter>();
  private readonly filterReactor = new ManufactureFilterReactor(this.filterChangedSubject);

  private dialogRef: MatDialogRef<ManufactureDialogComponent> | undefined;

  private readonly unsub = new Unsub();

  constructor(private readonly dialog: MatDialog,
              private readonly manufactureController: ManufactureController,) {
  }

  ngOnInit() {

    this.initDescriptions();

    this.unsub.sub = this.filterChangedSubject.pipe(
      filter(x => !!x),
      debounceTime(300),
    ).subscribe(filter => this.manufactures$ = this.manufactureController.loadManufactureRows(filter));

  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
    this.unsub.unsubscribe();
  }

  onRowClick(manufacture: Manufacture): void {
    this.dialogRef?.close();
    this.dialogRef = this.dialog.open(ManufactureDialogComponent, {
      width: '720px',
      height: '350px',
      data: {manufacture: manufacture},
    });
  }

  onSortClicked(sorting: Sorting): void {
    this.filterReactor.onSortChange(sorting);
  }

  private initDescriptions(): void {
    const manufactureTypesDesc = new FilterDropdownDescription<FilterElement>({
      elements$: this.manufactureController.loadManufactureTypesAsFilterElements(),
      getId: getIdFromFe,
      getName: getNameFromFe,
      label: 'Manufacture type...',
      defaultSelectedDisplayValue: '',
      onValueChange: this.filterReactor.onTypesChange,
    });

    const countDesc = new FilterNumberRangeDescription({
      title: 'Manufactured count',
      onValueChange: this.filterReactor.onCountChange,
    });

    const hrInvolvedDesc = new FilterNumberRangeDescription({
      title: 'HR involved',
      onValueChange: this.filterReactor.onHrInvolvedChange,
    });

    this.descriptions.push(manufactureTypesDesc, countDesc, hrInvolvedDesc);
  }

  get headers(): string[] {
    return ['Manufacture type', 'Manufactured count', 'Human Resources involved'];
  }

  get columnNames(): string[] {
    return ['manufacturedTypeLabel', 'manufacturedCount', 'hrInvolved'];
  }

}
