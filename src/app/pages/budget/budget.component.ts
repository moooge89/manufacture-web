import {Component, ElementRef, ViewChild} from '@angular/core';
import {BottomNotificationService} from "@service/bottom-notification/bottom-notification.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  @ViewChild('textarea') private textarea: ElementRef<HTMLTextAreaElement> | undefined;

  balance: number = 100;

  budgetRequest: number = 0;

  explanation: string = '';

  clearEmitter = new Subject<void>();

  constructor(private readonly bottomNotification: BottomNotificationService) {
  }

  onBudgetRequestChange(value: string): void {
    const parsed = Number.parseInt(value);

    if (!parsed || isNaN(parsed)) {
      return;
    }

    this.budgetRequest = parsed;
  }

  submit(): void {
    this.clearValues();
    this.bottomNotification.showInfo('You successfully made a budget request');
  }

  private clearValues(): void {
    this.explanation = '';
    this.budgetRequest = 0;
    this.clearEmitter.next();

    if (this.textarea?.nativeElement) {
      this.textarea.nativeElement.value = '';
    }
  }

}
