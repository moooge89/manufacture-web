import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Unsub} from "@util/Unsub";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {InputError} from "@model/web/InputError";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {

  @ViewChild('inputElement') private input: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('inputMatElement') private matInput: ElementRef<HTMLInputElement> | undefined;

  @Input() placeholder: string = '';

  @Input() type: string = 'text';

  @Input() withDebounce: boolean = true;

  @Input() useMatInput: boolean = true;

  @Input() value: string = '';

  @Input() clearOn = new Subject<void>();

  @Input() inputError: InputError = new InputError();

  @Output() valueChanged = new EventEmitter<string>();
  @Output() focused = new EventEmitter<void>();

  errorStateMatcher: ErrorStateMatcher | undefined;

  private readonly valueChangeSubject = new Subject<string>();
  private readonly unsub = new Unsub();

  ngOnInit() {
    this.valueChangeSubject.asObservable().pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(res => this.valueChanged.next(res));

    const self = this;

    this.errorStateMatcher = new class extends ErrorStateMatcher {
      isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return self.inputError.hasError;
      }
    };

    this.clearOn.subscribe(() => this.clearValues());
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onValueChange(text: string): void {
    if (this.withDebounce) {
      this.valueChangeSubject.next(text);
    } else {
      this.valueChanged.next(text);
    }

  }

  private clearValues(): void {
    if (this.input?.nativeElement) {
      this.input.nativeElement.value = '';
    }

    if (this.matInput?.nativeElement) {
      this.matInput.nativeElement.value = '';
    }

    this.onValueChange('');
  }

}
