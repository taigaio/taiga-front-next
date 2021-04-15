/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { addDecorator, addParameters } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withA11y } from '@storybook/addon-a11y';

// import SvgSpritePlugin from '@psff/cmp-icon';
// Vue.use(SvgSpritePlugin, {
//   svgSpriteFile: require('../resources/sprite.svg')
// });

// Centerd items
addDecorator(centered);

// Accesibility addon
addDecorator(withA11y);

// Background
addParameters({
  backgrounds: [{
    name: 'App',
    value: '#fff',
    default: true
  }, ],
});
