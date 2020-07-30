/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
