/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TgCheckboxComponent } from './checkbox.component';

describe('TgCheckboxComponent', () => {
  let spectator: Spectator<TgCheckboxComponent>;
  const createComponent = createComponentFactory({
    component: TgCheckboxComponent,
  });

  beforeEach(() => spectator = createComponent({
    props: {
      labelPosition: 'after',
    },
    detectChanges: false,
  }));

  it('should set a default label class', () => {
    spectator.detectChanges();
    expect(spectator.query('label')).toHaveClass('label-after');
  });

  it('should set different label class if label set before checkbox', () => {
    spectator.setInput('labelPosition', 'before');
    spectator.detectChanges();
    expect(spectator.query('label')).toHaveClass('label-before');
  });

});
