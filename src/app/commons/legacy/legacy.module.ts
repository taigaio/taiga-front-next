/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
