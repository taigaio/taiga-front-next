/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '@/app/api/tasks/tasks.model';
import { Issue } from '@/app/api/issues/issues.model';
import { Userstory } from '@/app/api/userstories/userstories.model';

export interface LegacyState {
  detailObj?: Task | Issue | Userstory;
}

@Injectable()
export class LegacyService {
  private injector: any;
  private ready = false;
  private state = new BehaviorSubject<LegacyState>({});

  legacyState = this.state.asObservable();

  public setState(state: Partial<LegacyState>) {
    this.state.next({
      ...this.state.value,
      ...state,
    });
  }

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
