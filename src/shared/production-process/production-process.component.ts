import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ProductionInfo} from "@model/production/ProductionInfo";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductionDialogComponent} from "../../app/dialogue/production/production-dialog.component";

@Component({
  selector: 'app-production-process',
  templateUrl: './production-process.component.html',
  styleUrls: ['./production-process.component.scss'],
})
export class ProductionProcessComponent implements AfterViewInit, OnDestroy {

  @ViewChild('scaleBar')
  private scaleBar: ElementRef<HTMLDivElement> | undefined;

  @Input() productionInfo: ProductionInfo | undefined;

  iterationListener: () => void = () => undefined;

  private dialogRef: MatDialogRef<ProductionDialogComponent> | undefined;

  constructor(private readonly dialog: MatDialog) {
  }

  ngAfterViewInit() {
    if (!this.scaleBar) {
      return;
    }

    this.setIterationTime();

    const self = this;

    this.iterationListener = () => self.increaseTodayManufactured();

    this.scaleBar.nativeElement.addEventListener('animationiteration', this.iterationListener);
  }

  ngOnDestroy() {
    if (this.scaleBar && this.iterationListener) {
      this.scaleBar.nativeElement.removeEventListener('animationiteration', this.iterationListener);
    }

    this.dialogRef?.close();
  }

  openDialog(): void {
    this.dialogRef?.close();
    this.dialogRef = this.dialog.open(ProductionDialogComponent, {
      width: '720px',
      height: '350px',
      data: {productionInfo: this.productionInfo},
    });
  }

  private setIterationTime(): void {
    if (!this.scaleBar) {
      return;
    }

    const animation = this.scaleBar.nativeElement.getAnimations()[0];

    if (!animation || !this.productionInfo) {
      return;
    }

    // todo orken do not pass milliseconds to one iteration less or equal to 0
    if (this.productionInfo.millisecondsToOneIteration <= 0) {
      this.productionInfo.millisecondsToOneIteration = 1_000;
    }

    animation.playbackRate = this.playbackRate();
    animation.currentTime = this.startTime();
  }

  private startTime(): number {
    if (!this.productionInfo) {
      return 0;
    }

    return this.productionInfo.currentPercentage * this.productionInfo.millisecondsToOneIteration / 100;
  }

  private playbackRate(): number {
    if (!this.productionInfo) {
      return 0;
    }

    return 1000 / this.productionInfo.millisecondsToOneIteration;
  }

  increaseTodayManufactured(): void {
    if (!this.productionInfo) {
      return;
    }

    this.productionInfo.todayManufactured++;
  }

}
