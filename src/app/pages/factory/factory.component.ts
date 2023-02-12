import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import * as L from "leaflet";
import {Browser, LeafletMouseEvent, map, tileLayer} from "leaflet";
import {PopUpService} from "@service/map-popup/pop-up.service";
import {calculateFactoryRadius} from "@util/CalculateUtil";
import {LEAFLET_API_TOKEN, LEAFLET_BASE_URL, LEAFLET_RETINA_URL} from "@const/LeafletConst";
import {FactoryController} from "@controller/FactoryController";
import {FactoryInfo} from "@model/factory/FactoryInfo";
import {GeoPoint} from "@model/factory/GeoPoint";
import {Router} from "@angular/router";
import {PathContextService} from "@service/path-context/path-context.service";
import {AuthService} from "@service/auth/auth.service";

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  factoryInfo: FactoryInfo | undefined = undefined;

  canShowDepartmentsLink: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly popupService: PopUpService,
    private readonly factoryController: FactoryController,
    private readonly pathContextService: PathContextService,
  ) {
  }

  async ngAfterViewInit() {
    // initMap() depends on factoryInfo, so getting factory info here, not in ngOnInit()

    const userInfo = await this.authService.userInfo();

    if (userInfo.isCompanyDirector()) {
      await this.initForCompanyDirector();
    } else if (userInfo.isFactoryDirector()) {
      this.canShowDepartmentsLink = true;
      await this.initForFactoryDirector();
    } else {
      throw new Error('7462DvfJwd :: Expected Company Director or Factory Director, got ' + userInfo.role);
    }

    this.initMap();
  }

  async ngOnDestroy() {
    const userInfo = await this.authService.userInfo();

    if (userInfo.isCompanyDirector()) {
      this.pathContextService.clearLastFactoryId();
    }
  }

  async goToDepartments() {
    await this.router.navigate(['/main/departments']);
  }

  private async initForCompanyDirector() {
    const factoryId = this.pathContextService.lastFactoryId;

    if (!factoryId) {
      await this.router.navigate(['/main/company']);
    }

    this.factoryInfo = await this.factoryController.loadFactoryInfoById(factoryId).toPromise();
  }

  private async initForFactoryDirector() {
    this.factoryInfo = await this.factoryController.loadFactoryInfo().toPromise();
  }

  private initMap(): void {
    if (!this.mapContainer || !this.factoryInfo) {
      return;
    }

    const geoPoint: GeoPoint = this.factoryInfo.geoPoint;

    const leafletMap = map(this.mapContainer.nativeElement).setView([geoPoint.latitude, geoPoint.longitude], 10);

    tileLayer(Browser.retina ? LEAFLET_RETINA_URL : LEAFLET_BASE_URL, {
      attribution: '',
      apiKey: LEAFLET_API_TOKEN,
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(leafletMap);

    const circle = L.circleMarker([geoPoint.latitude, geoPoint.longitude], {radius: calculateFactoryRadius(this.factoryInfo.workerCount)});

    circle.bindPopup(this.popupService.makeFactoryInfoPopup(this.factoryInfo));

    circle.addTo(leafletMap);

    leafletMap.addEventListener("click", function (event: LeafletMouseEvent) {
      console.log(event.latlng);
    });
  }

}
