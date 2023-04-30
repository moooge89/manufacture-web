import {Component, OnDestroy, OnInit} from '@angular/core';
import {BudgetController} from "@controller/BudgetController";
import {Unsub} from "@util/Unsub";
import {LoadBudgetRequest} from "@model/budget/LoadBudgetRequest";

@Component({
  selector: 'app-budget-request',
  templateUrl: './budget-request.component.html',
  styleUrls: ['./budget-request.component.scss']
})
export class BudgetRequestComponent implements OnInit, OnDestroy {

  requests: LoadBudgetRequest[] = [];

  private unsub = new Unsub();

  constructor(private readonly budgetController: BudgetController) {
  }

  ngOnInit() {
    this.unsub.sub = this.budgetController.loadBudgetRequestsAsResponsible().subscribe(requests => this.requests = requests);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

}
