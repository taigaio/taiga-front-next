/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
