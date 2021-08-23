/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector, Component } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { extModules } from './build-specifics';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ReactiveComponentModule } from '@ngrx/component';
import { createCustomElement } from '@angular/elements';

import { TextEditorModule } from '@/app/commons/text-editor/text-editor.module';
import { TextEditorComponent } from './commons/text-editor/text-editor.component';
import { ProjectNavigationModule } from './commons/project-navigation/project-navigation.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LegacyModule } from './commons/legacy/legacy.module';
import { LegacyComponent } from './commons/legacy/legacy.component';
import { LegacyLoaderComponent } from './commons/legacy/legacy-loader.component';
import { APP_BASE_HREF } from '@angular/common';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { ɵWebAnimationsDriver } from '@angular/animations/browser';
import { RouterTestingModule } from '@angular/router/testing';

// https://github.com/angular/angular/issues/25672
ɵWebAnimationsDriver.prototype.containsElement = (el1: any, el2: any) => {
  let elem = el2;
  while (elem && elem !== document.documentElement) {
    if (elem === el1) {
      return true;
    }
    elem = elem.parentNode || elem.host;
  }
  return false;
};

@Component({
  selector: 'tg-empty',
  template: '',
})
export class EmptyComponent {}

const componentes: [string, any][] = [
  ['tg-text-editor', TextEditorComponent],
  ['tg-legacy', LegacyComponent],
  ['tg-legacy-loader', LegacyLoaderComponent],
];

@NgModule({
  declarations: [],
  imports: [
    LegacyModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionTypeUniqueness: true,
      },
    }),
    extModules,
    EffectsModule.forRoot([]),
    ReactiveComponentModule,
    TextEditorModule,
    ProjectNavigationModule,
    TranslateModule.forRoot(),
    RouterTestingModule.withRoutes([
      {
        path: '**',
        component: EmptyComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: () => {
        const base = (window as any).taigaConfig.baseHref;
        return base || '/';
      },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService, TranslateService],
      useFactory: (appConfigService: ConfigService, translate: TranslateService) => {
        return () => {
          return appConfigService.fetch().then((config) => {
            translate.setDefaultLang(config.defaultLanguage);
            translate.use(config.defaultLanguage);

            return config;
          });
        };
      },
    },
  ],
})
export class WebcomponentModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    for (const component of componentes) {
      const strategyFactory = new ElementZoneStrategyFactory(component[1], this.injector);
      const el = createCustomElement(component[1], {injector : this.injector, strategyFactory});

      customElements.define(component[0], el);
    }
  }
}
