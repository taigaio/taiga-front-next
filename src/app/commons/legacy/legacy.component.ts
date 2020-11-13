/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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

@Component({
  selector: 'tg-legacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``,
})
export class LegacyComponent implements OnInit {
  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly legacyService: LegacyService) {}

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
        $location.url(e.url);
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

  @Input()
  public set translations(translations: any) {
    this.translate.setTranslation(translations.lan, translations.translationTable);
    this.translate.use(translations.lan);
  }
}
