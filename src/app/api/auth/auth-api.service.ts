import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@/app/config.service';
import { Auth, LoginInput } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public login(data: LoginInput) {
    return this.http.post<Auth>(`${this.config.apiUrl}/auth`, data);
  }
}
