/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { addons } from '@storybook/addons';
import Taiga from './theme';

import '@storybook/addon-knobs/register';
import '@storybook/addon-links/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-notes/register';

addons.setConfig({
  theme: Taiga,
});
