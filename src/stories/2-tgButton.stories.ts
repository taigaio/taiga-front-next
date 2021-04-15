/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { moduleMetadata, storiesOf } from '@storybook/angular';
import { text, boolean, withKnobs, select } from '@storybook/addon-knobs';
import { CommonComponentsModule } from '@/app/commons/components/common-components.module';
import faker from 'faker';

storiesOf('tgButton', module)
  .addDecorator(withKnobs)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonComponentsModule,
      ],
    })
  )
  .add('Primary button', () => {
    const buttonText = text('Content', faker.hacker.verb());
    const buttonDisabled = boolean('Disabled', false);
    const loading = boolean('Loading', false);
    const variant = select(
      'Variant',
      {
        primary: 'primary',
        secondary: 'secondary',
        flat: 'flat',
      },
      'primary'
    );

    return {
      template: `
        <button tg-button
          [loading]="loading"
          [variant]="variant"
          disabled="buttonDisabled ? 'disabled' : null">
          {{buttonText}}
        </button>
      `,
      props: {
        buttonText,
        buttonDisabled,
        loading,
        variant,
      },
    };
  });
