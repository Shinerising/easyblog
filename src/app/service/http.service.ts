import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  public constructor(
    private http: HttpClient) {
  }

  public async getMarkdown(url: string, options?: object): Promise<string> {
    return await this.get<string>(url, { responseType: 'text' });
  }

  private async get<T>(url: string, options?: object): Promise<T> {
    try {
      return await firstValueFrom(this.http.get<T>(url, options));
    } catch (error) {
      return await Promise.reject(error.message || error);
    }
  }
}
