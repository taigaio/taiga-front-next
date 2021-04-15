/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { moduleMetadata, storiesOf } from '@storybook/angular';
import { CommonComponentsModule } from '@/app/commons/components/common-components.module';
import { TgSvgSpriteComponent } from '@/app/commons/components/svg-sprite/svg-sprite.component';

storiesOf('tgLoading', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TgSvgSpriteComponent,
      ],
      imports: [
        CommonComponentsModule,
      ],
    })
  )
  .add('Loading', () => {
    return {
      template: `
      <tg-loading></tg-loading>
      <tg-svg-sprite hidden></tg-svg-sprite>
      `,
    };
  });
