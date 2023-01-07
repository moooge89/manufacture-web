import {Component} from '@angular/core';
import {FactoryController} from "@controller/FactoryController";
import {LightFactoryInfo} from "@model/api/factory/LightFactoryInfo";
import {Observable} from "rxjs/internal/Observable";
import {Router} from "@angular/router";
import {PathContextService} from "@service/path-context/path-context.service";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

  factories$: Observable<LightFactoryInfo[]> = this.factoryController.loadFactories();

  constructor(private readonly router: Router,
              private readonly factoryController: FactoryController,
              private readonly pathContextService: PathContextService) {
  }

  async handleFactoryClick(factory: LightFactoryInfo) {
    this.pathContextService.lastFactoryId = factory.id;
    await this.router.navigate(['/main/factory']);
  }

}
