import {Component} from '@angular/core';
import {IconRegisterService} from "@service/icon/icon-register.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private iconRegisterService: IconRegisterService,
  ) {
    iconRegisterService.init();
  }
}
