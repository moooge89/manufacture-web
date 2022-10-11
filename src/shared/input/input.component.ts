import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Unsub} from "@util/Unsub";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {

    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() hasError: boolean = false;
    @Input() withDebounce: boolean = false;

    @Output() valueChanged = new EventEmitter<string>();
    @Output() focused = new EventEmitter<void>();

    value: string = '';
    errorStateMatcher = new MyErrorStateMatcher();

    private readonly valueChangeSubject = new Subject<string>();
    private readonly unsub = new Unsub();

    ngOnInit() {
        this.valueChangeSubject.asObservable().pipe(
            debounceTime(400),
            distinctUntilChanged()
        ).subscribe(res => this.valueChanged.next(res));
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

}
