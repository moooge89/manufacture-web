import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InputError} from "@model/web/InputError";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T> implements OnInit {

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

  @Input() inputError: InputError = {hasError: false, errorText: ''};

  /**
   * on value change it emits it
   */
  @Output() valueChanged = new EventEmitter<string[]>();

  shownElements: T[] = [];

  errorStateMatcher: ErrorStateMatcher | undefined;

  private allElements: T[] = [];

  ngOnInit() {

    const self = this;

    this.errorStateMatcher = new class extends ErrorStateMatcher {
      isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return self.inputError.hasError;
      }
    };

  }

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
