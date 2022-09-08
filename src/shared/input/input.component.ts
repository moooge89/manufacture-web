import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {

  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  @Output() valueChanged = new EventEmitter<string>();

}
