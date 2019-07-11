import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  public constructor(
    private http: HttpClient) {
  }

  public getMarkdown(url: string, options?: object): Promise<string> {
    return this.get<string>(url, { responseType: 'text' });
  }

  private get<T>(url: string, options?: object): Promise<T> {
    return this.http.get<T>(url,options)
      .toPromise()
      .catch(error => {
        return Promise.reject(error.message || error);
      });
  }
}