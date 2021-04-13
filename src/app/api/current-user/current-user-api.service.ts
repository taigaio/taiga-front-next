import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@/app/config.service';
import { User } from '../users/users.model';

@Injectable()
export class CurrentUserApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getCurrentUser() {
    return this.http.get<User>(`${this.config.apiUrl}/me`);
  }
}
