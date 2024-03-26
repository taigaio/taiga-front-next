/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { TgLoadingComponent } from '../loading/loading.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<TgLoadingComponent>;
  const createComponent = createComponentFactory({
    component: TgLoadingComponent,
  });

  beforeEach(() => spectator = createComponent());

  it('should have a success class by default', () => {
    expect(spectator.query('div')).toHaveClass('loading');
  });

});
