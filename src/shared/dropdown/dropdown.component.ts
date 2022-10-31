import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T> {

  /**
   * function is used to extract ID from element
   */
  @Input() getId: (element: T) => string = () => '';

  /**
   * function is used to extract display name from element
   */
  @Input() getName: (element: T) => string = () => '';

  /**
   * label is used to display it on mat select
   */
  @Input() label: string = 'Select';

  /**
   * elements to be shown in dropdown list
   */
  @Input() set elements(elements: T[]) {
    this.allElements = [...elements];
    this.shownElements = [...elements];
  }

  /**
   * flag, that tells if dropdown list should be single or multiple
   */
  @Input() isMultiple: boolean = true;

  /**
   * id of the selected element
   */
  @Input() selectedElementId: string | undefined;

  /**
   * message, that will be shown, when no elements can be found
   */
  @Input() emptyMessage: string = 'No element can be found';

  /**
   * on value change it emits it
   */
  @Output() valueChanged = new EventEmitter<string[]>();

  shownElements: T[] = [];

  private allElements: T[] = [];

  onSearchChange(name: string): void {

    if (!name) {
      this.shownElements = [...this.allElements];
    }

    this.shownElements.length = 0;
    this.shownElements = this.allElements.filter(x => this.getName(x).toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  onValueChange(ids: string[]) {
    this.valueChanged.next(ids);
  }

}
