/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { NgModule } from '@angular/core';
import { LegacyService } from './legacy.service';
import { LegacyComponent } from './legacy.component';
import { LegacyLoaderComponent } from './legacy-loader.component';
import { ProjectNavigationModule } from '../project-navigation/project-navigation.module';
import { CommonModule } from '@angular/common';
import { CamelCaseTranformerPipe } from './camelcase-tranformer.pipe';
import { TgSvgSpriteComponent } from '@/app/commons/components/svg-sprite/svg-sprite.component';

@NgModule({
  declarations: [
    LegacyComponent,
    LegacyLoaderComponent,
    TgSvgSpriteComponent,
    CamelCaseTranformerPipe,
  ],
  imports: [
    CommonModule,
    ProjectNavigationModule,
  ],
  providers: [
    LegacyService,
  ],
  exports: [
    LegacyComponent,
    LegacyLoaderComponent,
  ],
})
export class LegacyModule { }
