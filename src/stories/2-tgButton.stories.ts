/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
