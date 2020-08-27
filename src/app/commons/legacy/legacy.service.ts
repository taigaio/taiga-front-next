/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class LegacyService {
  private injector: any;
  private ready = false;

  public getInjector() {
    if (!this.injector) {
      this.injector = this.angularBody().injector();
    }

    return this.injector;
  }

  public getTranslationTable(lan: string): object {
    const translate = this.getInjector().get('$translate');

    return translate.getTranslationTable(lan);
  }

  public angularBody() {
    return (window as any).angular.element('body');
  }

  public whenAngularReady() {
    const body = this.angularBody();

    if (this.ready) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const check = () => {
        requestAnimationFrame(() => {
          if (body.injector()) {
            this.ready = true;
            resolve();
          } else {
            check();
          }
        });
      };

      check();
    });
  }
}
