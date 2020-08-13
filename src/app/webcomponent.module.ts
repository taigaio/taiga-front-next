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
import { ProjectNavigationModule } from './commons/project-navigation/project-navigation.module';
import { ProjectNavigationComponent } from './commons/project-navigation/project-navigation.component';
import { TextEditorModule } from '@/app/commons/text-editor/text-editor.module';
import { TextEditorComponent } from './commons/text-editor/text-editor.component';

@NgModule({
  declarations: [
    TgSvgSpriteComponent,
  ],
  imports: [
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
    ProjectNavigationModule,
    TextEditorModule,
  ],
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
export class WebcomponentModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(TextEditorComponent, {injector : this.injector});
    customElements.define('tg-text-editor', el);
  }
}
