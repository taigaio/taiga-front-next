import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { Stats } from './stats.model';

@Injectable()
export class StatsApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getDiscover() {
    return this.http.get<Stats>(`${this.config.apiUrl}/stats/discover`);
  }
}
