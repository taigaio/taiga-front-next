/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => {
        return () => {
          return appConfigService.fetch();
        };
      },
    },
  ],
})
export class AppModule {}
