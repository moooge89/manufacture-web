import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  @Input() text: string = '';

  @Input() isDisabled: boolean = false;

  @Input() disabledMessage: string = '';

  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    if (this.isDisabled) return;

    this.clicked.emit();
  }

}
