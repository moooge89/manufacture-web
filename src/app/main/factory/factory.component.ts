import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Browser, map, tileLayer} from "leaflet";

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements AfterViewInit {

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement> | undefined;

  ngAfterViewInit() {
    if (!this.mapContainer) {
      return;
    }

    const initialState = { lng: 11, lat: 49, zoom: 4 };

    const lefletMap = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const isRetina = Browser.retina;
    const baseUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey={apiKey}";
    const retinaUrl = "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey={apiKey}";

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: '97f969d8d494421a91ed6ae444aff320',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(lefletMap);
  }
}
