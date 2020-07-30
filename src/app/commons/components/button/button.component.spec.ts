/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
