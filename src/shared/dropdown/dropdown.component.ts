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

  /**
   * error handler
   */
  @Input() inputError: InputError = new InputError();

  /**
   * If true, component emits full T element
   * <br>
   * Otherwise emits only id of the element
   */
  @Input() useElementEmitting: boolean = false;

  /**
   * on id change it emits new set id
   */
  @Output() idChanged = new EventEmitter<string[]>();

  /**
   * on element change it emits new set element
   */
  @Output() elementChanged = new EventEmitter<T[]>();

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

  onValueChange(ids: string[]): void {
    if (!this.isMultiple) {
      // @ts-ignore
      ids = [ids];
    }

    if (!this.useElementEmitting) {
      this.onIdChange(ids);
    } else {
      this.onElementChange(ids);
    }
  }

  private onIdChange(ids: string[]): void {
    this.idChanged.next(ids);
  }

  private onElementChange(ids: string[]): void {
    const set = new Set<string>();

    for (const id of ids) {
      set.add(id);
    }

    const selectedElements: T[] = this.allElements.filter(el => set.has(this.getId(el)));

    this.elementChanged.emit(selectedElements);
  }

}
