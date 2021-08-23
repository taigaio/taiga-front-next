/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Component, ChangeDetectionStrategy, Input, OnInit, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LegacyService } from './legacy.service';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { camelCase } from 'change-case';
import { DataConversionService } from '@/app/commons/text-editor/data-conversion.service';
import { ConfigService } from '@/app/config.service';

@Component({
  selector: 'tg-legacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class LegacyComponent implements OnInit {
  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly legacyService: LegacyService,
    private readonly config: ConfigService) {}

  public ngOnInit() {
    const channel = new BehaviorSubject<{
      type: string;
      value: any;
    }>({type: 'INIT', value: null});

    channel.subscribe((event) => {
      if (event.type === 'SET_DETAIL_OBJ') {
        this.legacyService.setState({
          detailObj: UtilsService.objKeysTransformer(event.value, camelCase) as any,
        });
      }
    });

    // share service with taiga-old
    const injector = Injector.create({
      providers: [
        {provide: DataConversionService, deps: []},
      ],
    });

    (window as any).legacyChannel = channel;
    (window as any).angularDataConversion = () => {
      return injector.get(DataConversionService);
    };

    this.router.events.pipe(
      filter((e: Event) => {
        return e instanceof NavigationEnd;
      })
    ).subscribe((e: NavigationEnd) => {
      const $location = this.legacyService.getInjector().get('$location');
      const $rootScrope = this.legacyService.getInjector().get('$rootScope');

      if ($location.path() !== e.url) {
        let url = e.url;

        if (url.startsWith(this.baseHref)) {
          url = url.replace(this.baseHref, '/');
        }

        $location.url(url);
      }

      $rootScrope.$applyAsync();
    });

    // Tell Angular when the route change in angularjs to keep both framework sync.
    // This fix an issue when the user for example is in /issues,
    // navigate with angular.js to /backlog and the try to go back to /issues
    // with an Angular link, without this code Angular thinks that you already are in /issues
    // so it prevents the navigation.
    this.legacyService.whenAngularReady().then(() => {
      const $location = this.legacyService.getInjector().get('$location');
      const $rootScrope = this.legacyService.getInjector().get('$rootScope');

      $rootScrope.$on('$routeChangeSuccess', () => {
        this.router.navigateByUrl($location.path());

        this.legacyService.setState({
          detailObj: undefined,
        });
      });
    });
  }

  get baseHref() {
    return (this.config._config as any).baseHref ?? '/';
  }

  @Input()
  public set translations(translations: any) {
    this.translate.setTranslation(translations.lan, translations.translationTable);
    this.translate.use(translations.lan);
  }
}
