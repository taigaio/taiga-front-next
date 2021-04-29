/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './models/config.model';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public get config() {
     // LEGACY
    if ((window as any).taigaConfig) {
      const config = {...(window as any).taigaConfig};
      if (config.api.endsWith('/')) {
        config.api = config.api.slice(0, config.api.length - 1);
      }

      return config;
    }

    return this._config;
  }

  public _config!: Config;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {}

  public fetch(): Promise<Config> {
    const environment = this.environmentService.getEnvironment();

    return new Promise((resolve, reject) => {
      // LEGACY
      if ((window as any).taigaConfig) {
        this._config = (window as any).taigaConfig;
        resolve(this.config);
      } else if (environment.configLocal) {
        this._config = environment.configLocal;
        resolve(this.config);
      } else if (environment.configRemote) {
        this.http.get<Config>(environment.configRemote).subscribe((config) => {
          this._config = config;
          resolve(this.config);
        });
      } else {
        reject('No config provided');
      }
    });
  }

  public get apiUrl() {
    return this.config.api;
  }
}
