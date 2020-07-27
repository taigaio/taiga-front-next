/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { moduleMetadata, storiesOf } from '@storybook/angular';
import { TgButtonComponent } from '../app/commons/components/button/button.component';
import { CommonComponentsModule } from '../app/commons/components/common-components.module';

storiesOf('tgButton', module)
  .addDecorator(moduleMetadata({ imports: [ CommonComponentsModule ]}))
  .add('Basic', () => ({
    component: TgButtonComponent,
    template: `
      <tg-button>
        A basic buttin
    </tg-button>
    `,
  }));
