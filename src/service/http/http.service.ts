import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {TOKEN_HEADER} from "@const/LocalStorageConst";

interface KeyValue {
  key: string;
  value: string;
}

class OptionsBuilder {
  private appendingHeaders: KeyValue[] = [];
  private appendingParams: KeyValue[] = [];

  appendHeader(key: string, value: string): void {
    if (value !== undefined) {
      this.appendingHeaders.push({key, value});
    }
  }

  appendParam(key: string, value: string): void {
    if (value !== undefined) {
      this.appendingParams.push({key, value});
    }
  }

  get headers(): HttpHeaders {
    const ret: { [name: string]: string | string[] } = {};
    this.appendingHeaders.forEach(h => {
      ret[h.key] = h.value;
    });
    return new HttpHeaders(ret);
  }

  get params(): { [name: string]: string | string[]; } {
    const ret: { [name: string]: string | string[] } = {};
    this.appendingParams.forEach(h => {
      ret[h.key] = h.value;
    });
    return ret;
  }

  get paramsAsString(): string {

    const data = new URLSearchParams();

    this.appendingParams.forEach(h => {

      if (h.value !== undefined && h.value !== null) {
        data.append(h.key, h.value);
      }

    });

    return data.toString();
  }

  appendParamsFromKeyValue(keyValue: { [p: string]: any } | undefined) {
    keyValueAppender(keyValue, (key, value) => this.appendParam(key, value));
  }
}

const keyValueAppender = (keyValue: {
  [p: string]: any
} | undefined, appendFunc: (key: string, value: string) => void) => {
  if (!keyValue) {
    return;
  }

  // eslint-disable-next-line guard-for-in
  for (const key in keyValue) {
    const value = keyValue[key];

    if (value === undefined || value === null) {
      continue;
    }

    if (typeof value === 'string') {
      appendFunc(key, value as string);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      appendFunc(key, '' + value);
    } else if (value instanceof Date) {
      appendFunc(key, '' + (value as Date).getTime());
    } else if (typeof value === 'object') {
      appendFunc(key, JSON.stringify(value, (k, v) => v ?? null)); // do not lose undefined fields
    } else {
      throw new Error('Unknown type of parameter `' + key + '` : typeof value = `'
        + (typeof value) + '` : value = `' + value + '`');
    }

  }

};

export class HttpService {

  constructor(
    private readonly http: HttpClient,
    private readonly urlPrefix: string,
  ) {
  }

  private prefix(): string {
    return this.urlPrefix;
  }

  url(urlSuffix: string): string {
    return this.prefix() + urlSuffix;
  }

  setControllerPrefix(controllerPrefix: string): HttpService {
    const prefixHandler = {
      get(target: any, name, receiver) {
        if (name === 'url') {
          return (urlSuffix: string) => {
            return target.prefix() + controllerPrefix + urlSuffix;
          };
        }
        return Reflect.get(target, name, receiver);
      },
    } as ProxyHandler<HttpService>;
    return new Proxy(this, prefixHandler);
  }

  get<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<T> {

    const ob: OptionsBuilder = this.newOptionsBuilder();

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.get<T>(this.url(urlSuffix), {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      params: ob.params,
      withCredentials: true,
    });

  }

  post<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<T> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.post<T>(this.url(urlSuffix), ob.paramsAsString, {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  postBody<T>(urlSuffix: string, body: any): Observable<T> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/json');

    return this.http.post<T>(this.url(urlSuffix), body, {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  postFile(urlSuffix: string, file: File, keyValue?: { [key: string]: any }): Observable<HttpEvent<string>> {

    const ob = this.newOptionsBuilder();
    const formData: FormData = new FormData();

    keyValueAppender(keyValue, (key, value) => formData.append(key, value));

    formData.append('file', file, file.name);

    return this.http.post(this.url(urlSuffix), formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'text',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  async downloadResource(urlSuffix: string, keyValue?: { [key: string]: any }): Promise<HttpResponse<Blob>> {

    const ob: OptionsBuilder = this.newOptionsBuilder();
    ob.appendParamsFromKeyValue(keyValue);

    const response: HttpResponse<Blob> = await this.http.get(this.url(urlSuffix), {
      observe: 'response',
      responseType: 'blob',
      headers: ob.headers,
      params: ob.params,
      withCredentials: true,
    }).toPromise();

    // noinspection TypeScriptUnresolvedVariable
    const url = window.URL.createObjectURL(response.body);
    const filename: string = decodeURIComponent(response.headers.get('Content-Disposition') || ''
      .split(';')[1]
      .split('=')[1]
      .replace(/["]/g, ''));

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);
    return response;
  }

  put<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<T> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.put<T>(this.url(urlSuffix), ob.paramsAsString, {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  putBody<T>(urlSuffix: string, body: any): Observable<T> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/json');

    return this.http.put<T>(this.url(urlSuffix), body, {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  patch<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<T> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.patch<T>(this.url(urlSuffix), ob.paramsAsString, {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  delete<T>(urlSuffix: string, keyValue?: { [key: string]: any }): Observable<T> {

    const ob = this.newOptionsBuilder();
    ob.appendHeader('Content-Type', 'application/x-www-form-urlencoded');

    ob.appendParamsFromKeyValue(keyValue);

    return this.http.delete<T>(this.url(urlSuffix), {
      observe: 'body',
      responseType: 'json',
      headers: ob.headers,
      withCredentials: true,
    });

  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_HEADER) || null;
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem(TOKEN_HEADER, value);
    } else {
      localStorage.removeItem(TOKEN_HEADER);
    }
  }

  private newOptionsBuilder(): OptionsBuilder {
    const ob = new OptionsBuilder();
    if (this.token) {
      ob.appendHeader(TOKEN_HEADER, this.token);
    }
    return ob;
  }

}
