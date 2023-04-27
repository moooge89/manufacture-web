import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetController} from "@controller/BudgetController";
import {Unsub} from "@util/Unsub";
import {LoadBudgetRequest} from "@model/budget/LoadBudgetRequest";

@Component({
  selector: 'app-load-budget',
  templateUrl: './load-budget.component.html',
  styleUrls: ['./load-budget.component.scss']
})
export class LoadBudgetComponent implements OnInit, OnDestroy {

  requests: LoadBudgetRequest[] = [];

  private unsub = new Unsub();

  constructor(private readonly budgetController: BudgetController) {
  }

  ngOnInit() {
    this.unsub.sub = this.budgetController.loadBudgetRequests().subscribe(requests => this.requests = requests);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  decline(id: number): void {
    this.removeFromRequests(id);
    this.unsub.sub = this.budgetController.declineBudgetRequest(id).subscribe();
  }

  accept(id: number): void {
    this.removeFromRequests(id);
    this.unsub.sub = this.budgetController.acceptBudgetRequest(id).subscribe();
  }

  private removeFromRequests(id: number): void {
    this.requests = this.requests.filter(req => req.id !== id);
  }

}
