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

  min: number = 0;
  max: number = 0;

  isFocused = false;

  onMinChange(): void {
    this.valueChanged.next({
      min: this.min,
      max: this.max,
    });
  }

  onMaxChange(): void {
    this.valueChanged.next({
      min: this.min,
      max: this.max,
    });
  }

}
