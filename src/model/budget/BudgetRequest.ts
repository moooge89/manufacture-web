export class BudgetRequest {

  amount: number = 0;

  reason: string = '';

  constructor(init?: Partial<BudgetRequest>) {
    Object.assign(this, init);
  }

  clear(): void {
    this.amount = 0;
    this.reason = '';
  }

}
