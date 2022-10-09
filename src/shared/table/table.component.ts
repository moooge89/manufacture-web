import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {Unsub} from "@util/Unsub";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> implements OnInit, OnDestroy {

  @Input() headers: string[] = [];

  @Input() rows$: Observable<T[]> = of([]);

  @Input() columnNames: string[] = [];

  @Input() isMatIcon: (index: number) => boolean = () => false;

  @Input() isMoney: (index: number) => boolean = () => false;

  @Output() rowClicked = new EventEmitter<T>();

  rows: T[] = [];
  isLoading: boolean = true;

  private unsub = new Unsub();

  ngOnInit() {
    this.unsub.sub = this.rows$.pipe(
    ).subscribe(rows => {
      this.isLoading = false;
      this.rows = rows;
    });
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onRowClick(row: T): void {
    this.rowClicked.emit(row);
  }

}
