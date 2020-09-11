/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { moduleMetadata } from '@storybook/angular';
import { APP_BASE_HREF } from '@angular/common';
import { StoryBookTranslationModule } from './translate-local-loader';
import { RouterModule } from '@angular/router';

import { TgSvgSpriteComponent } from '@/app/commons/components/svg-sprite/svg-sprite.component';
import { LegacyService } from '@/app/commons/legacy/legacy.service';
import { LegacyServiceMock } from '@/app/commons/legacy/legacy-service.mock';

export const ConfigureStory = (config: {
  component: any,
  title: string,
  declarations?: any[],
  extraModules?: any[],
  routing?: boolean,
  translations?: boolean,
}) => {
  config = {
    declarations: [],
    extraModules: [],
    routing: true,
    translations: true,
    ...config,
  };

  const metadata = {
    declarations: [
      TgSvgSpriteComponent,
      ...config.declarations,
    ],
    providers: [
      {
        provide: LegacyService, useClass: LegacyServiceMock,
      },
    ],
    imports: [
      ...config.extraModules,
    ],
  };

  if (config.routing) {
    metadata.providers.push({provide: APP_BASE_HREF, useValue: '/'});
    metadata.imports.push(
      // Prevent Storybook error "Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'iframe.html'"
      RouterModule.forRoot([], { useHash: true })
    );
  }

  if (config.translations) {
    metadata.imports.push(
      // Add local translations from assets/i18n/en.json
      StoryBookTranslationModule()
    );
  }

  return {
    title: config.title,
    component: config.component,
    decorators: [
      moduleMetadata(metadata),
    ],
  };
};
