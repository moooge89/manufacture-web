import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as L from "leaflet";
import {Browser, LeafletMouseEvent, map, tileLayer} from "leaflet";
import {PopUpService} from "../../../service/map-popup/PopUpService";
import {calculateFactoryRadius} from "../../../util/CalculateUtil";
import {LEAFLET_API_TOKEN, LEAFLET_BASE_URL, LEAFLET_RETINA_URL} from "../../../consts/LeafletConst";
import {FactoryController} from "../../../controller/FactoryController";
import {FactoryInfo} from "../../../model/api/FactoryInfo";
import {GeoPoint} from "../../../model/api/GeoPoint";

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements AfterViewInit {

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  factoryInfo: FactoryInfo | undefined = undefined;
  mapExpanded: boolean = true;

  constructor(
    private readonly popupService: PopUpService,
    private readonly factoryController: FactoryController,
  ) {
  }

  async ngAfterViewInit() {
    this.factoryInfo = await this.factoryController.loadFactoryInfo().toPromise();
    this.initMap();
  }

  private initMap(): void {
    if (!this.mapContainer || !this.factoryInfo) {
      return;
    }

    this.mapExpanded = false;

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
