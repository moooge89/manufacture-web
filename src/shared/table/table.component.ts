import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Unsub} from "@util/Unsub";
import {ConfirmationService} from "@service/confirmation/confirmation.service";

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

  @Input() isAdminTable: boolean = false;

  @Input() isMoney: (index: number) => boolean = () => false;

  @Input() getId: (element: T) => string = () => '';

  @Input() rowUpsert = new EventEmitter<T>();

  @Output() addClicked = new EventEmitter<void>();

  @Output() rowClicked = new EventEmitter<T>();

  rows: T[] = [];
  isLoading: boolean = true;

  private checkedIds = new Set<string>();

  private unsub = new Unsub();

  constructor(private readonly confirmService: ConfirmationService) {
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
      this.checkedIds.add(id);
    } else {
      this.checkedIds.delete(id);
    }
  }

  addRow(): void {
    this.addClicked.emit();
  }

  async deleteRows() {
    if (this.checkedIds.size === 0) {
      return;
    }

    const resp = await this.confirmService.confirm();

    if (!resp) {
      return;
    }

    // todo era do delete (make request to server)
    // await this.controller.delete([]);

    this.rows = this.rows.filter(row => !this.checkedIds.has(this.getId(row)));

    this.checkedIds.clear();
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

}
