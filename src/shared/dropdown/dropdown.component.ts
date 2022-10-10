import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T> {

  @Input() getId: (element: T) => string = () => '';

  @Input() getName: (element: T) => string = () => '';

  @Input() label = 'Select';

  @Input() set elements(elements: T[]) {
    this.allElements = [...elements];
    this.shownElements = [...elements];
  }

  @Output() valueChanged = new EventEmitter<string[]>();

  shownElements: T[] = [];

  private allElements: T[] = [];

  onSearchChange(name: string): void {

    if (!name) {
      this.shownElements = [...this.allElements];
    }

    this.shownElements.length = 0;

    this.shownElements = this.allElements.filter(x => this.getName(x).indexOf(name) > -1);
  }

  onValueChange(ids: string[]) {
    this.valueChanged.next(ids);
  }

}
