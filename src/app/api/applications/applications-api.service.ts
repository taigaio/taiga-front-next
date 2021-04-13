import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { Application } from './application.model';
import { ApplicationToken } from '@/app/api/application-tokens/application-tokens.model';

@Injectable()
export class ApplicationsApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/applications`;
  }

  public get(id: string) {
    return this.http.get<Application>(`${this.base}/${id}`);
  }

  public getToken(id: string) {
    return this.http.get<ApplicationToken>(`${this.base}/${id}/token`);
  }
}
