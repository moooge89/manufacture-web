import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ProductionInfo} from "@model/api/production/ProductionInfo";
import {Subject} from "rxjs";

@Component({
  selector: 'app-production-process',
  templateUrl: './production-process.component.html',
  styleUrls: ['./production-process.component.scss'],
})
export class ProductionProcessComponent implements AfterViewInit, OnDestroy {

  @ViewChild('scaleBar')
  private scaleBar: ElementRef<HTMLDivElement> | undefined;

  @Input() productionInfo: ProductionInfo = {
    currentPercentage: 0,
    departmentId: "",
    factoryId: "",
    millisecondsToOneIteration: 5000,
    teamId: "",
    titleToShow: 'title'
  };

  iterationListener: () => void = () => undefined;

  private increaseSubject = new Subject<void>();

  ngAfterViewInit() {
    if (!this.scaleBar) {
      return;
    }

    const startTime = this.productionInfo.currentPercentage * this.productionInfo.millisecondsToOneIteration / 100;

    this.setIterationTime(this.productionInfo.millisecondsToOneIteration, startTime);

    const self = this;

    this.iterationListener = () => self.increaseSubject.next();

    this.scaleBar.nativeElement.addEventListener('animationiteration', this.iterationListener);
  }

  ngOnDestroy() {
    if (this.scaleBar && this.iterationListener) {
      this.scaleBar.nativeElement.removeEventListener('animationiteration', this.iterationListener);
    }
  }

  private setIterationTime(iterationMilliseconds: number, startMilliseconds: number): void {
    if (!this.scaleBar) {
      return;
    }

    const animation = this.scaleBar.nativeElement.getAnimations()[0];

    if (!animation) {
      return;
    }

    animation.playbackRate = 1000 / iterationMilliseconds;
    animation.currentTime = startMilliseconds;
  }

}
