import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as L from "leaflet";
import {Browser, LeafletMouseEvent, map, tileLayer} from "leaflet";
import {PopUpService} from "@service/map-popup/PopUpService";
import {calculateFactoryRadius} from "@util/CalculateUtil";
import {LEAFLET_API_TOKEN, LEAFLET_BASE_URL, LEAFLET_RETINA_URL} from "@const/LeafletConst";
import {FactoryController} from "@controller/FactoryController";
import {FactoryInfo} from "@model/api/factory/FactoryInfo";
import {GeoPoint} from "@model/api/factory/GeoPoint";
import {Router} from "@angular/router";
import {PathContextService} from "@service/context/path-context.service";

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements AfterViewInit {

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  factoryInfo: FactoryInfo | undefined = undefined;

  constructor(
    private readonly router: Router,
    private readonly popupService: PopUpService,
    private readonly factoryController: FactoryController,
    private readonly pathContextService: PathContextService,
  ) {
  }

  async ngAfterViewInit() {
    // initMap() depends on factoryInfo, so getting factory info here, not in ngOnInit()

    // todo era get user role and call appropriate method

    // check, if user is company director
    if (1 == 1) {
      await this.initForCompanyDirector();
    }
    // check, if user is factory director
    else if (2 == 2) {
      await this.initForFactoryDirector();
    } else {
      throw new Error('7462DvfJwd :: Expected Company Director or Factory Director');
    }

    this.initMap();
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
