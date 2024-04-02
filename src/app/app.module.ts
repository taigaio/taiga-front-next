/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { extModules } from './build-specifics';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ReactiveComponentModule } from '@ngrx/component';
import { TgSvgSpriteComponent } from '@/app/commons/components/svg-sprite/svg-sprite.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    TgSvgSpriteComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
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
    StoreRouterConnectingModule.forRoot(),
    ReactiveComponentModule,
    TranslateModule.forRoot(),
  ],
  bootstrap: [AppComponent],
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
export class AppModule {}
