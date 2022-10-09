import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Unsub} from "@util/Unsub";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnDestroy {

  @Input() headers: string[] = [];

  @Input() set rows$(rows$: Observable<T[]>) {
    this.loadContent(rows$);
  }

  @Input() columnNames: string[] = [];

  @Input() isMatIcon: (index: number) => boolean = () => false;

  @Input() isMoney: (index: number) => boolean = () => false;

  @Output() rowClicked = new EventEmitter<T>();

  rows: T[] = [];
  isLoading: boolean = true;

  private unsub = new Unsub();

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onRowClick(row: T): void {
    this.rowClicked.emit(row);
  }

  private loadContent(rows$: Observable<T[]>) {
    this.isLoading = true;

    this.unsub.sub = rows$.subscribe(rows => {
      this.isLoading = false;
      this.rows = rows;
    });
  }

}
