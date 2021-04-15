/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TgButtonComponent } from './button.component';
import { TgLoadingComponent } from '../loading/loading.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgButtonComponent>;
  const createComponent = createComponentFactory({
    component: TgButtonComponent,
    declarations: [
      TgLoadingComponent,
    ],
  });

  beforeEach(() => spectator = createComponent({
    // The component inputs
    props: {
      variant: 'primary',
    },
    detectChanges: false,
  }));

  it('should have a success class by default', () => {
    expect(spectator.query('div')).toHaveClass('btn-inner');
  });

  it('should set the class name according to the [className] input', () => {
    spectator.setInput('loading', true);
    expect(spectator.query('div')).not.toHaveAttribute('icon');
  });
});
