import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Unsub} from "@util/Unsub";
import {ConfirmationService} from "@service/confirmation/confirmation.service";
import {take} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {Sorting} from "@model/web/Sorting";
import {SortType} from "@model/web/SortType";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit, OnDestroy {

  @Input() headers: string[] = [];

  @Input() set rows$(rows$: Observable<T[]>) {
    this.loadContent(rows$);
  }

  @Input() columnNames: string[] = [];

  @Input() isMatIcon: (index: number) => boolean = () => false;

  @Input() isMoney: (index: number) => boolean = () => false;

  @Input() isAdminTable: boolean = false;

  @Input() getId: (element: T) => number = () => -1;

  @Input() rowUpsert = new Subject<T>();

  @Input() deleteRows$: (ids: number[]) => Observable<void> = () => of(undefined);

  @Output() addClicked = new EventEmitter<void>();

  @Output() rowClicked = new EventEmitter<T>();

  @Output() sortClicked = new EventEmitter<Sorting>();

  rows: T[] = [];
  isLoading: boolean = true;

  sorting: Sorting = new Sorting();

  private checkedIds: number[] = [];

  private readonly unsub = new Unsub();

  constructor(private readonly confirmService: ConfirmationService,) {
  }

  ngOnInit() {
    this.unsub.sub = this.rowUpsert.subscribe(row => this.updateRow(row));
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onRowClick(row: T): void {
    this.rowClicked.emit(row);
  }

  checkId(flag: boolean, row: T): void {
    const id = this.getId(row);

    if (flag) {
      if (!this.ifHas(id)) {
        this.checkedIds.push(id);
      }
    } else {
      this.checkedIds = this.checkedIds.filter(oldId => oldId !== id);
    }
  }

  addRow(): void {
    this.addClicked.emit();
  }

  async deleteRows(): Promise<void> {
    if (this.checkedIds.length === 0) {
      return;
    }

    const resp = await this.confirmService.confirm();

    if (!resp) {
      return;
    }

    const setOfIds = new Set<number>();

    this.checkedIds.forEach(checkedId => setOfIds.add(checkedId));

    this.deleteRows$(this.checkedIds).pipe(
      take(1),
    ).subscribe(() => {
      this.rows = this.rows.filter(row => !setOfIds.has(this.getId(row)));
      this.checkedIds = [];
    });

  }

  sortIcon(headerName: string, index: number): string {
    const fieldName = this.columnNames[index] || '';

    if (this.sorting.fieldName !== fieldName) {
      return 'sort-disabled';
    }

    if (this.sorting.isAsc()) {
      return 'sort-asc';
    } else {
      return 'sort-desc';
    }

  }

  handleSortClick(headerName: string, index: number): void {
    const fieldName = this.columnNames[index] || '';

    if (this.sorting.fieldName !== fieldName) {
      this.sorting.sortType = SortType.ASC;
      this.sorting.fieldName = fieldName;
    } else if (this.sorting.isAsc()) {
      this.sorting.sortType = SortType.DESC;
    } else if (this.sorting.isDesc()) {
      this.sorting.sortType = SortType.ASC;
    }

    this.sortClicked.emit(this.sorting);
  }

  toLowerCase(iconName: string): string {
    return iconName?.toLowerCase() || '';
  }

  private loadContent(rows$: Observable<T[]>): void {
    this.isLoading = true;

    this.unsub.sub = rows$.subscribe(rows => {
      this.isLoading = false;
      this.rows = rows;
    });
  }

  private updateRow(row: T): void {
    const index = this.rows.findIndex(x => this.getId(row) === this.getId(x));

    if (index < 0) {
      this.rows.push(row);
    } else {
      this.rows[index] = row;
    }

  }

  private ifHas(newId: string | number): boolean {
    return this.checkedIds.findIndex((id: string | number) => id === newId) > -1;
  }

}
