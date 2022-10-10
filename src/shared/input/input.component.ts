import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Unsub} from "@util/Unsub";

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
