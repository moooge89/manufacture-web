import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {TeamProductionInfo} from "@model/api/production/TeamProductionInfo";

@Component({
  selector: 'app-team-production',
  templateUrl: './team-production.component.html',
  styleUrls: ['./team-production.component.scss'],
})
export class TeamProductionComponent implements AfterViewInit {

  @ViewChild('scaleBar') private scaleBar: ElementRef<HTMLDivElement> | undefined;

  @Input() productionInfo: TeamProductionInfo = {
    currentPercentage: 0,
    departmentId: "",
    factoryId: "",
    millisecondsToOneIteration: 5000,
    teamId: "",
    titleToShow: 'title'
  };

  ngAfterViewInit() {
    if (!this.scaleBar) {
      return;
    }

    const startTime = this.productionInfo.currentPercentage * this.productionInfo.millisecondsToOneIteration / 100;

    this.setIterationTime(this.productionInfo.millisecondsToOneIteration, startTime);

    this.scaleBar.nativeElement.addEventListener('animationiteration', () => {});
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
