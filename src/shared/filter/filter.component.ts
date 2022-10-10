import {Component, OnDestroy, OnInit} from '@angular/core';
import {Unsub} from "@util/Unsub";
import {FilterController} from "@controller/FilterController";
import {MaterialFilterDescription} from "@model/filter/MaterialFilterDescription";
import {FilterElement} from "@model/filter/FilterElement";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {

  filterDescription: MaterialFilterDescription | undefined;

  private readonly unsub = new Unsub();

  constructor(
    private readonly filterController: FilterController,
  ) {
  }

  ngOnInit() {
    this.unsub.sub = this.filterController.loadFilterDescription().subscribe(
      filterDescription => this.filterDescription = filterDescription
    );
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  getId = (element: FilterElement) => {
    return element.id;
  }

  getName = (element: FilterElement) => {
    return element.name;
  }

}
