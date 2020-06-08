/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, addParameters } from '@storybook/angular';
import { centered } from '@storybook/addon-centered/angular';
import { withA11y } from '@storybook/addon-a11y';

// import SvgSpritePlugin from '@psff/cmp-icon';
// Vue.use(SvgSpritePlugin, {
//   svgSpriteFile: require('../resources/sprite.svg')
// });

// import '../styles/App.css';

// const req = require.context('../stories', true, /.stories.[tj]sx?$/);

// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

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

// configure(loadStories, module);