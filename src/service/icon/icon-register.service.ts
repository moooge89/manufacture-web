import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({providedIn: 'root'})
export class IconRegisterService {

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly matIconRegistry: MatIconRegistry,
  ) {
  }

  init() {
    this.matIconRegistry.addSvgIconResolver(name => {
      const url = `assets/icons/${name}.svg`;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

}
