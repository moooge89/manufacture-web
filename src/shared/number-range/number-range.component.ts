import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NumberRange} from "@model/filter/NumberRange";

@Component({
  selector: 'app-number-range',
  templateUrl: './number-range.component.html',
  styleUrls: ['./number-range.component.scss'],
})
export class NumberRangeComponent {

  @Input() minValue: number = 0;

  @Input() maxValue: number = Number.MAX_VALUE;

  @Input() title: string = '';

  @Output() valueChanged = new EventEmitter<NumberRange>();

  range = new NumberRange();

  isFocused = false;

  onMinChange(): void {
    this.valueChanged.next(this.range);
  }

  onMaxChange(): void {
    this.valueChanged.next(this.range);
  }

}
