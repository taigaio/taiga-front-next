/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
      const config = (window as any).taigaConfig;
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
