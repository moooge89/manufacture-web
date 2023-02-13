import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BottomNotificationService} from "@service/bottom-notification/bottom-notification.service";
import {Subject} from "rxjs";
import {BudgetController} from "@controller/BudgetController";
import {BudgetRequest} from "@model/budget/BudgetRequest";
import {Unsub} from "@util/Unsub";
import {InputError} from "@model/web/InputError";
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnDestroy {

  @ViewChild('textarea') private textarea: ElementRef<HTMLTextAreaElement> | undefined;

  balance: number = 0;

  budgetRequest: BudgetRequest = new BudgetRequest();

  clearEmitter = new Subject<void>();

  amountError = new InputError();
  reasonError = new InputError();
  errorStateMatcher: ErrorStateMatcher | undefined;

  mock: string = '';

  private isSubmitting: boolean = false;

  private unsub = new Unsub();

  constructor(private readonly budgetController: BudgetController,
              private readonly bottomNotification: BottomNotificationService,) {
  }

  ngOnInit() {
    this.unsub.sub = this.budgetController.loadAvailableBudget().subscribe(budget => this.balance = budget);

    const self = this;

    this.errorStateMatcher = new class extends ErrorStateMatcher {
      isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return self.reasonError.hasError;
      }
    };
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  onBudgetRequestChange(value: string): void {
    const parsed = Number.parseInt(value);

    if (!parsed || isNaN(parsed)) {
      this.budgetRequest.amount = NaN;
      return;
    }

    this.budgetRequest.amount = parsed;
  }

  amountInputFocused(): void {
    this.amountError.clearIfHasError();
  }

  reasonTextareaFocused(): void {
    this.reasonError.clearIfHasError();
  }

  submit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.budgetRequest.reason = this.explanation();

    if (this.isValidationFailed()) {
      this.isSubmitting = false;
      return;
    }

    this.unsub.sub = this.budgetController.makeBudgetRequest(this.budgetRequest).subscribe(() => {
      this.clearValues();
      this.bottomNotification.showInfo('You successfully made a budget request');

      this.isSubmitting = false;
    });

  }

  private isValidationFailed(): boolean {
    let hasAnyError: boolean = false;

    if (isNaN(this.budgetRequest.amount) || this.budgetRequest.amount <= 0) {
      this.amountError.error('Enter positive number');
      hasAnyError = true;
    }

    if (!this.budgetRequest.reason || !this.budgetRequest.reason.trim()) {
      this.reasonError.error('Enter reason');
      hasAnyError = true;
    }

    return hasAnyError;
  }

  private clearValues(): void {
    this.budgetRequest.clear();
    this.clearEmitter.next();

    if (this.textarea?.nativeElement) {
      this.textarea.nativeElement.value = '';
    }
  }

  private explanation(): string {
    if (this.textarea?.nativeElement) {
      return this.textarea.nativeElement.value;
    }

    return '';
  }

}
