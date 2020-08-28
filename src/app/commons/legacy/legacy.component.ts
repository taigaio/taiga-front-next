/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LegacyService } from './legacy.service';

@Component({
  selector: 'tg-legacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tg-svg-sprite></tg-svg-sprite>
  `,
})
export class LegacyComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private legacyService: LegacyService) {}


  public ngOnInit() {
    this.router.events.pipe(
      filter((e: Event) => {
        return e instanceof NavigationEnd;
      })
    ).subscribe((e: NavigationEnd) => {
      const $location = this.legacyService.getInjector().get('$location');
      const $rootScrope = this.legacyService.getInjector().get('$rootScope');

      $location.url(e.url);
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
      });
    });
  }

  @Input()
  public set translations(translations: any) {
    this.translate.setTranslation(translations.lan, translations.translationTable);
    this.translate.use(translations.lan);
  }
}
