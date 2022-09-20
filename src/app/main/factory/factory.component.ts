import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Browser, LeafletMouseEvent, map, tileLayer} from "leaflet";
import * as L from 'leaflet';
import {PopUpService} from "../../../service/map-popup/PopUpService";

function calculateRadius(people: number): number {
  if (people <= 10) {
    return 5;
  }

  const res = 5 + (people - 5) * 0.01;

  if (res > 20) {
    return 20;
  }

  return res;
}


@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements AfterViewInit {

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  constructor(
    private readonly popupService: PopUpService,
  ) {
  }

  ngAfterViewInit() {
    if (!this.mapContainer) {
      return;
    }

    const initialState = {lng: 76.97141432814534, lat: 43.26501881519278, zoom: 10};

    const leafletMap = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const isRetina = Browser.retina;
    const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    const data = {name: 'Almaty', state: 'Almaty', population: 10};

    const circle = L.circleMarker([initialState.lat, initialState.lng], {radius: calculateRadius(data.population)});

    circle.bindPopup(this.popupService.makeCapitalPopup(data));

    circle.addTo(leafletMap);

    leafletMap.addEventListener("click", function (event: LeafletMouseEvent) {
      console.log(event.latlng);
    });

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: '',
      apiKey: '97f969d8d494421a91ed6ae444aff320',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(leafletMap);
  }
}
