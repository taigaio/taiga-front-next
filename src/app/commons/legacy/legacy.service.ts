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

  public getInjector() {
    if (!this.injector) {
      this.injector = (window as any).angular.element('body').injector();
    }

    return this.injector;
  }

  public getTranslationTable(lan: string): object {
    const translate = this.getInjector().get('$translate');

    return translate.getTranslationTable(lan);
  }

}
