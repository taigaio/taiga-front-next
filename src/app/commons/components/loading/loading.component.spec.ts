/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
