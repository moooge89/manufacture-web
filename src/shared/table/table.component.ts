import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T> {

  @Input() headers: string[] = [];

  @Input() rows: T[] = [];

  @Input() columnNames: string[] = [];

  @Input() isMatIcon: (index: number) => boolean = () => false;

  @Input() isMoney: (index: number) => boolean = () => false;

  @Output() rowClicked = new EventEmitter<T>();

  onRowClick(row: T): void {
    this.rowClicked.emit(row);
  }

}
