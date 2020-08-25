/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { extModules } from './build-specifics';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ReactiveComponentModule } from '@ngrx/component';
import { createCustomElement } from '@angular/elements';

import { TgSvgSpriteComponent } from '@/app/commons/components/svg-sprite/svg-sprite.component';
import { TextEditorModule } from '@/app/commons/text-editor/text-editor.module';
import { TextEditorComponent } from './commons/text-editor/text-editor.component';
import { ProjectNavigationModule } from './commons/project-navigation/project-navigation.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LegacyModule } from './commons/legacy/legacy.module';
import { LegacyComponent } from './commons/legacy/legacy.component';
import { LegacyLoaderComponent } from './commons/legacy/legacy-loader.component';

const componentes: [string, any][] = [
  ['tg-text-editor', TextEditorComponent],
  // ['tg-project-navigation', ProjectNavigationComponent],
  ['tg-legacy', LegacyComponent],
  ['tg-legacy-loader', LegacyLoaderComponent],
];

@NgModule({
  declarations: [
    TgSvgSpriteComponent,
  ],
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
  ],
  providers: [
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
      const el = createCustomElement(component[1], {injector : this.injector});
      customElements.define(component[0], el);
    }
  }
}
