import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamProductionInfo} from "@model/api/production/TeamProductionInfo";
import {Unsub} from "@util/Unsub";
import {ProductionController} from "@controller/ProductionController";

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit, OnDestroy {

  productionInfo: TeamProductionInfo[] = [];

  private readonly unsub = new Unsub();

  constructor(private readonly productionController: ProductionController) {
  }

  ngOnInit() {
    this.unsub.sub = this.productionController.loadTeamProductionInfo().subscribe(
      productionInfo => this.productionInfo = productionInfo
    );
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

}
