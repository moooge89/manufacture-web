import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpService} from './http.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({imports: [CommonModule, HttpClientModule]})
export class HttpServiceModule {

  static forRoot(urlPrefix: string): ModuleWithProviders<HttpServiceModule> {

    return {
      ngModule: HttpServiceModule,
      providers: [
        {
          provide: HttpService,
          deps: [HttpClient],
          useFactory: (http: HttpClient) => new HttpService(http, urlPrefix),
        },
      ],
    };
  }

}
