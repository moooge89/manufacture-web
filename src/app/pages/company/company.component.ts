import {Component, OnDestroy, OnInit} from '@angular/core';
import {FactoryController} from "@controller/FactoryController";
import {LightFactoryInfo} from "@model/factory/LightFactoryInfo";
import {Observable} from "rxjs/internal/Observable";
import {Router} from "@angular/router";
import {PathContextService} from "@service/path-context/path-context.service";
import {Company} from "@model/company/Company";
import {CompanyController} from "@controller/CompanyController";
import {Unsub} from "@util/Unsub";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  company: Company | undefined;

  factories$: Observable<LightFactoryInfo[]> = this.factoryController.loadFactories();

  private unsub = new Unsub();

  constructor(private readonly router: Router,
              private readonly factoryController: FactoryController,
              private readonly companyController: CompanyController,
              private readonly pathContextService: PathContextService,) {
  }

  ngOnInit() {
    this.unsub.sub = this.companyController.loadCompany().subscribe(company => this.company = company);
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  async handleFactoryClick(factory: LightFactoryInfo): Promise<void> {
    this.pathContextService.lastFactoryId = factory.id;
    await this.router.navigate(['/main/factory']);
  }

  get headers(): string[] {
    return ['Name', 'Director', 'Workers'];
  }

  get columnNames(): string[] {
    return ['name', 'director', 'workerCount'];
  }

}
