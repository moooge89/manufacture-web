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

  @Input() productionInfo: ProductionInfo = new ProductionInfo();

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

    this.iterationListener = () => self.productionInfo.increaseTodayManufactured();

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
      height: '320px',
      data: {productionInfo: this.productionInfo},
    });
  }

  private setIterationTime(): void {
    if (!this.scaleBar) {
      return;
    }

    const animation = this.scaleBar.nativeElement.getAnimations()[0];

    if (!animation) {
      return;
    }

    animation.playbackRate = this.productionInfo.playbackRate();
    animation.currentTime = this.productionInfo.startTime();
  }

}
